"use client";

import { useEffect, useRef, useState } from "react";
import "./story.css";

const stories = [
  { id: 1, image: "/images/story1.webp", user: "forever" },
  { id: 2, image: "/images/story2.webp", user: "my" },
  { id: 3, image: "/images/story3.webp", user: "love" },
];

export default function Stories() {
  const [activeIndex, setActiveIndex] = useState(-1); // -1 = модалка закрыта
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const startX = useRef(0);
  const frameRef = useRef(null);

  // ⏳ Плавный прогресс
  useEffect(() => {
    if (activeIndex < 0) return;

    setProgress(0);
    setLiked(false);

    let start = null;
    const duration = 5000;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        nextStory();
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [activeIndex]);

  const nextStory = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      closeModal();
    }
  };

  const prevStory = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const closeModal = () => {
    setActiveIndex(-1);
  };

  // Свайпы
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

      {/* Модалка всегда в DOM, просто скрыта через CSS */}
      <div
        className={`modal ${activeIndex >= 0 ? "active" : ""}`}
        onClick={closeModal}
      >
        <div
          className="content"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="progress">
            <div style={{ width: `${progress}%` }} />
          </div>

          {activeIndex >= 0 && <img src={stories[activeIndex].image} alt="" />}

          <button
            className={`like ${liked ? "active" : ""}`}
            onClick={() => setLiked(!liked)}
          >
            ♥
          </button>

          <button className="close" onClick={closeModal}>
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
