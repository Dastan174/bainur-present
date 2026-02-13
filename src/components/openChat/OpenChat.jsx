"use client";
import { useEffect, useState } from "react";
import "./openChat.css";
import Chat from "../../modals/Chat";

export default function OpenChat() {
  const [chatVisible, setChatVisible] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 600); // остановка анимации
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <div className="mainbek">
        <div className="mail-wrapper" onClick={() => setChatVisible(true)}>
          <div className={`mail-icon ${shake ? "shake" : ""}`}>
            💌
            <span className="badge">1</span>
          </div>
        </div>
      </div>

      <Chat visible={chatVisible} onClose={() => setChatVisible(false)} />
    </div>
  );
}
