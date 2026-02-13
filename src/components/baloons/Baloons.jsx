"use client";
import { useState } from "react";
import "./baloons.css";

const offers = [
  { id: 1, text: "Я люблю, когда ты смеешься - это делает мой день." },
  { id: 2, text: "С тобой даже обычные моменты становятся особенными." },
  { id: 3, text: "Ты рядом, и мне спокойно, как будто весь мир на месте." },
  { id: 4, text: "Каждый день с тобой - это маленькая радость." },
  {
    id: 5,
    text: "Ты делаешь простые вещи красивыми просто своим присутствием.",
  },
];

export default function Balloons() {
  // Первый шарик уже "лопнут"
  const [popped, setPopped] = useState(1);

  return (
    <div className="sky">
      {offers.map((offer, i) => (
        <div
          key={offer.id}
          className={`balloon balloon-${i} ${
            popped === offer.id ? "popped" : ""
          }`}
          onClick={() => setPopped(offer.id)}
        >
          <div className="shape"></div>
          <div className="string"></div>

          {popped === offer.id && (
            <div className="offer-text">{offer.text}</div>
          )}
        </div>
      ))}
    </div>
  );
}
