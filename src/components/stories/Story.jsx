"use client";

import { useEffect, useRef, useState } from "react";
import "./story.css";

const stories = [
  { id: 1, image: "/images/story1.png", user: "forever" },
  { id: 2, image: "/images/story2.png", user: "my" },
  { id: 3, image: "/images/story3.webp", user: "love" },
];

export default function Stories() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const frameRef = useRef(null);

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
      setActiveIndex((prev) => prev + 1);
    } else {
      closeModal();
    }
  };

  const prevStory = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const closeModal = () => {
    setActiveIndex(-1);
  };

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = startX.current - endX;
    const diffY = startY.current - endY;

    // свайп вниз
    if (diffY < -80) {
      closeModal();
      return;
    }

    // свайпы в стороны
    if (diffX > 50) {
      nextStory();
      return;
    }

    if (diffX < -50) {
      prevStory();
      return;
    }
  };

  const handleStoryClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
      nextStory();
    } else {
      prevStory();
    }
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

      <div
        className={`modal ${activeIndex >= 0 ? "active" : ""}`}
        onClick={closeModal}
      >
        <div
          className="content"
          onClick={(e) => {
            e.stopPropagation();
            handleStoryClick(e);
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="progress">
            <div style={{ width: `${progress}%` }} />
          </div>

          {activeIndex >= 0 && <img src={stories[activeIndex].image} alt="" />}

          <button
            className={`like ${liked ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            ♥
          </button>

          <button
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
