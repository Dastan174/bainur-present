"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";

export default function HoldHeart() {
  const progress = useMotionValue(0);
  const animationRef = useRef(null);

  const [burst, setBurst] = useState(false);
  const [holding, setHolding] = useState(false);
  const [completed, setCompleted] = useState(false);

  const fillY = useTransform(progress, [0, 100], [24, 0]);
  const scale = useTransform(progress, [0, 100], [1, 1.2]);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 350,
        rotate: Math.random() * 360,
      })),
    [burst],
  );

  const startFill = () => {
    setHolding(true);
    setCompleted(false);

    animationRef.current?.stop();

    animationRef.current = animate(progress, 100, {
      duration: 2,
      ease: "linear",
      onComplete: () => {
        setBurst(true);
        setCompleted(true);

        if ("vibrate" in navigator) {
          navigator.vibrate(100);
        }

        setTimeout(() => {
          setBurst(false);
        }, 1200);
      },
    });
  };

  const stopFill = () => {
    setHolding(false);

    animationRef.current?.stop();

    animate(progress, 0, {
      duration: 0.4,
      ease: "easeOut",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        padding: 30,
      }}
    >
      <motion.div
        style={{
          width: 220,
          height: 220,
          position: "relative",
          overflow: "visible",
          cursor: "pointer",
          scale,
        }}
        onMouseDown={startFill}
        onMouseUp={stopFill}
        onMouseLeave={stopFill}
        onTouchStart={startFill}
        onTouchEnd={stopFill}
      >
        <AnimatePresence>
          {burst &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  scale: [0, 1.2, 0.5],
                  opacity: [1, 1, 0],
                  rotate: particle.rotate,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 24,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                ❤️
              </motion.div>
            ))}
        </AnimatePresence>

        <motion.svg
          animate={
            !holding
              ? {
                  scale: [1, 1.06, 1],
                  rotate: [-2, 2, -2],
                }
              : {}
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          style={{
            overflow: "visible",
            position: "relative",
            zIndex: 2,
          }}
        >
          <defs>
            <clipPath id="heartClip">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </clipPath>
          </defs>

          <g clipPath="url(#heartClip)">
            <motion.rect
              x="0"
              width="24"
              height="24"
              fill="#ff2d55"
              style={{
                y: fillY,
              }}
            />
          </g>

          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="#ff2d55"
            strokeWidth="1.3"
          />
        </motion.svg>
      </motion.div>

      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        style={{
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {holding ? "Продолжай удерживать ❤️" : "Зажми и удерживай сердце"}
      </motion.div>

      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            style={{
              fontSize: 20,
              fontWeight: 600,
              textAlign: "center",
              fontFamily: "Marck Script"
            }}
          >
            Сердце наполнено любовью
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
