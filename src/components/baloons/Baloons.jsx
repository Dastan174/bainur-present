"use client";
import { useState } from "react";
import "./baloons.css";

const offers = [
  { id: 1, text: "Твои объятия — мое самое любимое место на свете." },
  { id: 2, text: "Когда ты рядом, на душе становится тепло и спокойно." },
  { id: 3, text: "Твоя улыбка делает мой день намного счастливее." },
  { id: 4, text: "Мне хорошо просто знать, что ты есть в моей жизни." },
  { id: 5, text: "С тобой каждый день становится немного красивее." },
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
