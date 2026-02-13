"use client";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import "./typewritter.css";

export default function TypingFeather() {
  const fullText =
    "Мне приятно просто сидеть рядом с тобой и ничего не делать. Ты делаешь мою жизнь проще и теплее. С тобой хочется быть каждый день.";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Добавляем буквы
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Обновляем координаты пера после каждого рендера
  useLayoutEffect(() => {
    if (cursorRef.current && textRef.current) {
      const rect = cursorRef.current.getBoundingClientRect();
      const textRect = textRef.current.getBoundingClientRect();

      // Вычисляем позицию относительно контейнера текста
      setCoords({
        x: rect.left - textRect.left + rect.width / 2 + 20,
        y: rect.top - textRect.top + rect.height / 2 - 30, // Поднимаем перо на 15px
      });
    }
  }, [displayedText]);

  return (
    <div className="typing-container">
      <div className="text-wrapper" ref={textRef}>
        <p className="typing-text">
          {displayedText}
          <span className="cursor-span" ref={cursorRef}></span>
        </p>

        <motion.span
          className="feather"
          animate={{
            x: coords.x,
            y: coords.y,
            rotate: [-10, 10, -10],
          }}
          transition={{
            x: { type: "spring", stiffness: 150, damping: 20 },
            y: { type: "spring", stiffness: 150, damping: 20 },
            rotate: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          🪶
        </motion.span>
      </div>
    </div>
  );
}
