"use client";
import { useState } from "react";
import "./baloons.css";

const offers = [
  { id: 1, text: "Моя радость начинается там, где ты." },
  { id: 2, text: "Ты - мое вдохновение и покой одновременно." },
  { id: 3, text: "Ты — свет, который окрашивает мои будни в цвета счастья." },
  { id: 4, text: "С тобой мой мир обрёл свои краски." },
  { id: 5, text: "Ты делаешь мой мир ярче с каждым днём." },
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
