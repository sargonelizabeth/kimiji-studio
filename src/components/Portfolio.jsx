import React, { useState } from "react";

export default function Works() {
  const [expanded, setExpanded] = useState(false);

  const base = [
    "/assets/portfolio/p01.jpg",
    "/assets/portfolio/p02.jpg",
    "/assets/portfolio/p03.jpg",
    "/assets/portfolio/p04.jpg",
  ];

  const more = [
    "/assets/customers/c01.jpg",
    "/assets/customers/c02.jpg",
    "/assets/customers/c03.jpg",
    "/assets/customers/c04.jpg",
  ];

  return (
    <section id="works" className="works">
      <div className="works__inner">
        <h2 className="works__title">포트폴리오</h2>

        {/* 중앙정렬 1열 */}
        <div className="works__grid works__grid--single">
          {base.map((src, i) => (
            <figure key={i} className="frame">
              <img src={src} alt={`portfolio ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>

        {expanded && (
          <div className="works__grid works__grid--more">
            {more.map((src, i) => (
              <figure key={i} className="frame">
                <img src={src} alt={`more ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        )}

        <div className="works__cta">
          <button
            type="button"
            className="btn btn--black"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "접기" : "더 보기"}
          </button>
        </div>
      </div>

      <style>{`
        .works { padding: 40px 16px 28px; }
        .works__inner { max-width: 980px; margin: 0 auto; text-align: center; }

        .works__title { font-size: 22px; font-weight: 800; margin: 0 0 16px; }

        /* 중앙 정렬 핵심 */
        .works__grid--single {
          display: grid;
          justify-items: center;   /* 아이템 가로 중앙 */
          row-gap: 12px;
        }
        /* 1열 프레임은 최대폭 제한 후 중앙 */
        .frame { width: 100%; max-width: 540px; aspect-ratio: 4 / 5; margin: 0; overflow: hidden; border-radius: 14px; }
        .frame img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* 더보기 2x2 그리드 */
        .works__grid--more {
          display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 12px;
        }

        .works__cta { display: flex; justify-content: center; margin-top: 14px; }

        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 20px; border-radius: 999px; border: 0; cursor: pointer;
          font-weight: 800; text-decoration: none; box-shadow: 0 8px 24px rgba(0,0,0,.12);
        }
        .btn--black { background: #111; color: #fff; }

        @media (min-width: 680px) {
          .works { padding: 48px 16px 36px; }
          .works__grid--more { gap: 14px; }
        }
      `}</style>
    </section>
  );
}
