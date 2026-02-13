"use client";
import { useState, useEffect } from "react";

export default function ChatAnswer({ visible, onClose }) {
  const [messages, setMessages] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [showTyping, setShowTyping] = useState(false);

  const baynurMessage =
    "Я хочу построить с тобой наш собственный мир, где будут только честность, доверие и бесконечная нежность.";
  const begimayMessage =
    "В нашем мире даже тишина будет говорить на языке любви, а каждый вдох — напоминать, как прекрасно быть частью тебя.";

  useEffect(() => {
    if (!visible) return;

    setMessages([{ sender: "Адиль", text: baynurMessage }]);
    setCurrentText("");
    setShowTyping(true);

    let index = 0;
    const typingInterval = setInterval(() => {
      setCurrentText(begimayMessage.slice(0, index + 1));
      index++;
      if (index === begimayMessage.length) {
        clearInterval(typingInterval);
        setMessages((prev) => [
          ...prev,
          { sender: "Аделина💞", text: begimayMessage },
        ]);
        setShowTyping(false);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [visible]);

  // Закрытие по Escape
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    // клик по оверлею закрывает
    <div className="chat-overlay" onClick={onClose}>
      {/* а внутри — блокируем всплытие, чтобы клики по чату НЕ закрывали модал */}
      <div className="chat-container" onClick={(e) => e.stopPropagation()}>
        {/* <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✖️
        </button> */}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.sender === "Адиль" ? "chat-right" : "chat-left"
            }`}
          >
            <p className="person">{msg.sender}</p>
            <div className="bubble">{msg.text}</div>
          </div>
        ))}

        {showTyping && (
          <div className="chat-message chat-left">
            <p className="person">Аделина💕..</p>
            <div className="bubble">{currentText || "…"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
