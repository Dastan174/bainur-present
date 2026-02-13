"use client";
import "./videoAdil.css";
import { useState, useEffect } from "react";

const VideoShamil = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Не рендерим на сервере
  if (!isClient) return null;

  return (
    <div className="wrapper">
      <h2>Наши воспоминания</h2>
      {windowWidth < 500 ? (
        <iframe
          src="https://www.youtube.com/embed/RmV6MQyEs2U?autoplay=0&mute=1&controls=1&rel=0"
          title="Наши короткие моменты счастья"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          muted
          className="img"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <p style={{ padding: "20px", color: "#666", fontStyle: "italic" }}>
          Видео доступно только на экранах меньше 500px
        </p>
      )}

      {/* Отладочная информация */}
      <div
        style={{
          marginTop: "10px",
          fontSize: "12px",
          color: "#888",
          padding: "5px",
          background: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        Примечание: Видео приватное.
      </div>
    </div>
  );
};

export default VideoShamil;
