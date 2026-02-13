"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useRef, useState } from "react";
import Slider from "../components/slider/Slider";
import Balloons from "../components/baloons/Baloons";
import Typewritter from "../components/typewritter/Typewritter";
import OpenChat from "../components/openChat/OpenChat";
import LastChat from "../components/lastChat/LastChat";
import PhotoReveal from "../components/photoReveal/PhotoReveal";
import VideoAdil from "../components/videoAdil/VideoAdil";
import Story from "../components/stories/Story";
import Insta from "../components/insta/Insta";

const page = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showRest, setShowRest] = useState(false); // состояние для остальных блоков

  const smoothScrollDown = () => {
    setShowRest(true); // при клике открываем остальные блоки

    const start = window.scrollY;
    const target = start + window.innerHeight; // прокручиваем на высоту экрана
    const duration = 1000;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);

      // easeOutCubic
      const easing = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start + (target - start) * easing);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };
  useEffect(() => {
    const enableSound = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current
          .play()
          .catch((e) => console.log("Ошибка воспроизведения:", e));
      }
    };
    document.addEventListener("click", enableSound, { once: true });
    document.addEventListener("scroll", enableSound, { once: true });
    document.addEventListener("keydown", enableSound, { once: true });
    return () => {
      document.removeEventListener("click", enableSound);
      document.removeEventListener("scroll", enableSound);
      document.removeEventListener("keydown", enableSound);
    };
  }, []);
  return (
    <div className={styles.page}>
      <audio
        ref={audioRef}
        loop
        preload="auto" // ← предзагрузка
        crossOrigin="anonymous" // ← для CORS если нужно
      >
        {/* <source src="/music.mp3" type="audio/mpeg/" /> */}
        Ваш браузер не поддерживает аудио.
      </audio>
      <div
        onClick={smoothScrollDown}
        className={styles.img2}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image priority src="/images/open.webp" fill alt="open" />
      </div>
      {showRest && (
        <>
          <Typewritter />
          <Story />
          <Insta />
          <PhotoReveal />
          <Slider />
          <div className={styles.img1}>
            <Image src="/images/six.png" fill alt="open" loading="lazy" />
          </div>
          <OpenChat />
          <Balloons />
          <div className={styles.img1}>
            <Image src="/images/winter.png" fill alt="open" loading="lazy" />
          </div>
          <VideoAdil />
          <LastChat />
        </>
      )}
    </div>
  );
};

export default page;
