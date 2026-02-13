"use client";

import { useState, useEffect } from "react";

export default function HeartEffect() {
  const [hearts, setHearts] = useState([]);

  const addHeart = (e) => {
    const newHeart = {
      id: Date.now(),
      x: e.pageX, // координата X относительно документа
      y: e.pageY, // координата Y относительно документа
      size: 16 + Math.random() * 32,
    };
    setHearts((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  useEffect(() => {
    document.addEventListener("click", addHeart);
    return () => document.removeEventListener("click", addHeart);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <p
          key={heart.id}
          src="https://img1.picmix.com/output/stamp/normal/8/3/9/3/1803938_93bdb.gif"
          alt=""
          style={{
            position: "absolute",
            left: heart.x - heart.size / 2 + "px",
            top: heart.y - heart.size / 2 + "px",
            width: heart.size + "px",
            height: heart.size + "px",
            pointerEvents: "none", // чтобы клики проходили сквозь
            userSelect: "none",
            zIndex: 9999,
            animation: "rise 1.5s ease-out forwards",
          }}
        >
          💕
        </p>
      ))}

      <style jsx>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
