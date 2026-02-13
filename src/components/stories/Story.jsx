"use client";

import { useEffect, useRef, useState } from "react";
import "./story.css";

const stories = [
  { id: 1, image: "/images/story1.png", user: "forever" },
  { id: 2, image: "/images/story2.png", user: "my" },
  { id: 3, image: "/images/story3.png", user: "love" },
];

export default function Stories() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const startX = useRef(0);
  const scrollY = useRef(0);

  // 🚫 Блокировка скролла
  useEffect(() => {
    if (activeIndex !== null) {
      scrollY.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [activeIndex]);

  // ⏳ Плавный прогресс через requestAnimationFrame
  useEffect(() => {
    if (activeIndex === null) return;

    let start = null;
    let frame;
    const duration = 5000; // 5 секунд

    setProgress(0);
    setLiked(false);

    const animate = (timestamp) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / duration) * 100, 100);

      setProgress(percent);

      if (percent < 100) {
        frame = requestAnimationFrame(animate);
      } else {
        nextStory();
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  const nextStory = () => {
    setActiveIndex((i) =>
      i !== null && i < stories.length - 1 ? i + 1 : null
    );
  };

  const prevStory = () => {
    setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  };

  // 👉 Свайпы
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextStory();
    if (diff < -50) prevStory();
  };

  return (
    <>
      <div className="list">
        {stories.map((story, i) => (
          <div
            key={story.id}
            className="story"
            onClick={() => setActiveIndex(i)}
          >
            <img src={story.image} alt={story.user} />
            <span>{story.user}</span>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="modal" onClick={() => setActiveIndex(null)}>
          <div
            className="content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Прогресс */}
            <div className="progress">
              <div style={{ width: `${progress}%` }} />
            </div>

            <img src={stories[activeIndex]?.image} alt="" />

            {/* Лайк */}
            <button
              className={`like ${liked ? "active" : ""}`}
              onClick={() => setLiked(!liked)}
            >
              ♥
            </button>

            {/* Закрыть */}
            <button className="close" onClick={() => setActiveIndex(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
