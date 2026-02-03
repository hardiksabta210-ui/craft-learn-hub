import { useState, useEffect } from "react";

const SESSION_KEY = "book-buddy-session-id";

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `session_${crypto.randomUUID()}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
};
