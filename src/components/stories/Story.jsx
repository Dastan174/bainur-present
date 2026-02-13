"use client";

import { useEffect, useRef, useState } from "react";
import "./story.css";

const stories = [
  { id: 1, image: "/images/end.webp", user: "alex" },
  { id: 2, image: "/images/open.webp", user: "maria" },
  { id: 3, image: "/images/end.webp", user: "john" },
];

export default function Stories() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const startX = useRef(0);

  // Автопрогресс
  useEffect(() => {
    if (activeIndex === null) return;

    setProgress(0);
    setLiked(false);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextStory();
          return 0;
        }
        return p + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextStory = () => {
    setActiveIndex((i) =>
      i !== null && i < stories.length - 1 ? i + 1 : null,
    );
  };

  const prevStory = () => {
    setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i));
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
