import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { pdfId, interests, topic, sessionId } = await req.json();

    let pdfContent = "";
    
    // If a PDF was uploaded, get its content
    if (pdfId) {
      const { data: pdfData } = await supabase
        .from("uploaded_pdfs")
        .select("extracted_text, file_name")
        .eq("id", pdfId)
        .single();

      if (pdfData?.extracted_text) {
        pdfContent = pdfData.extracted_text;
      }
    }

    const interestsList = interests.join(", ");
    
    const systemPrompt = `You are Book Buddy, an AI that creates personalized educational content. 
Your task is to generate engaging, custom book content based on user interests.
Make the content relatable by using examples and analogies from the user's interests.
Structure content in clear chapters with engaging titles.
Keep language accessible and fun while being educational.`;

    const userPrompt = pdfContent
      ? `Create a personalized book based on the following content, tailored to someone interested in: ${interestsList}.

Original content:
${pdfContent.substring(0, 8000)}

Generate a book with:
1. An engaging title that reflects both the topic and the learner's interests
2. A brief description (2-3 sentences)
3. 3-5 chapters, each connecting the educational content to the reader's interests (${interestsList})

Return the response as JSON with this structure:
{
  "title": "string",
  "description": "string",
  "chapters": [
    {
      "title": "string",
      "content": "string (detailed chapter content, at least 200 words)",
      "relatedInterest": "string (which interest this chapter relates to)"
    }
  ]
}`
      : `Create an engaging introductory book about "${topic}" for someone interested in: ${interestsList}.

Generate a book with:
1. An engaging title that reflects both the topic and the learner's interests
2. A brief description (2-3 sentences)
3. 3-5 chapters, each connecting the educational content to the reader's interests (${interestsList})

Return the response as JSON with this structure:
{
  "title": "string",
  "description": "string",
  "chapters": [
    {
      "title": "string",
      "content": "string (detailed chapter content, at least 200 words)",
      "relatedInterest": "string (which interest this chapter relates to)"
    }
  ]
}`;

    const aiResponse = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`AI API error: ${aiResponse.status} - ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const bookContent = JSON.parse(aiData.choices[0].message.content);

    // Save the book to database
    const { data: bookData, error: bookError } = await supabase
      .from("custom_books")
      .insert({
        session_id: sessionId,
        pdf_id: pdfId,
        title: bookContent.title,
        description: bookContent.description,
        interests: interests,
        chapters: bookContent.chapters,
        status: "completed",
      })
      .select()
      .single();

    if (bookError) throw bookError;

    return new Response(
      JSON.stringify({
        bookId: bookData.id,
        title: bookContent.title,
        description: bookContent.description,
        chapters: bookContent.chapters,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Error generating book:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate book";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
