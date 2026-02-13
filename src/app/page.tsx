"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useRef, useState } from "react";
import Slider from "../components/slider/Slider";
import Balloons from "@/components/baloons/Baloons";
import Typewritter from "../components/typewritter/Typewritter";
import OpenChat from "../components/openChat/OpenChat";
import LastChat from "../components/lastChat/LastChat";
import PhotoReveal from "../components/photoReveal/PhotoReveal";
import VideoAdil from "../components/videoAdil/VideoAdil";
import Story from "../components/stories/Story";
import Insta from "../components/insta/Insta";

const Page = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showRest, setShowRest] = useState(false);

  // Скролл вниз с анимацией
  const smoothScrollDown = () => {
    setShowRest(true);

    const start = window.scrollY;
    const target = start + window.innerHeight;
    const duration = 1000;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start + (target - start) * easing);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // включаем музыку после клика на открытку
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .catch((e) => console.log("Ошибка воспроизведения:", e));
    }
  };

  // Включение аудио после любого взаимодействия (click, scroll, keydown)
  useEffect(() => {
    const enableSound = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current
        .play()
        .catch((e) => console.log("Ошибка воспроизведения:", e));
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
      {/* Аудио */}
      <audio ref={audioRef} loop preload="auto" muted>
        <source src="/music.mp3" type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>

      {/* Картинка для начала */}
      <div
        onClick={smoothScrollDown}
        className={styles.img2}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Image priority src="/images/open.webp" fill alt="open" />
      </div>

      {/* Остальные блоки */}
      {showRest && (
        <>
          <Typewritter />
          <Story />
          <Insta />
          <div className={styles.img3}>
            <Image src="/images/six.webp" fill alt="open" loading="lazy" />
          </div>
          <PhotoReveal />
          <div className={styles.img3}>
            <Image src="/images/ml.webp" fill alt="open" loading="lazy" />
          </div>
          <Slider />
          <div className={styles.img2}>
            <Image src="/images/four.webp" fill alt="open" loading="lazy" />
          </div>
          <OpenChat />
          <div className={styles.img2}>
            <Image src="/images/lake.webp" fill alt="open" loading="lazy" />
          </div>
          <Balloons />
          <VideoAdil />
          <div className={styles.img1}>
            <Image src="/images/winter.webp" fill alt="open" loading="lazy" />
          </div>
          <LastChat />
          <div className={styles.img2}>
            <Image src="/images/end.webp" fill alt="open" loading="lazy" />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
