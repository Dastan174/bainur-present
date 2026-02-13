"use client";
import { useEffect, useState } from "react";
import "./heart.css";

export default function HeartsRain() {
  const [hearts, setHearts] = useState([]);
  const heartsArray = [
    "🤍",
    "🤎",
    "❤️",
    "💓",
    "💚",
    "💜",
    "💛",
    "💙",
    "🩵",
    "🩶",
    "🩷",
    "🧡",
    "🖤",
    "🧡",
    "💕",
    "❣️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * window.innerWidth,
        emoji: heartsArray[Math.floor(Math.random() * heartsArray.length)],
      };

      setHearts((prev) => [...prev, newHeart]);

      // Удаляем старые сердца через 3 сек
      setHearts((prev) => prev.filter((h) => Date.now() - h.id < 3000));
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <div key={heart.id} className="heart" style={{ left: heart.left }}>
          {heart.emoji}
        </div>
      ))}
    </div>
  );
}
