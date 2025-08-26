import React, { useState } from "react";

export default function Works() {
  const [expanded, setExpanded] = useState(false);

  // 기본 포트폴리오(1열, 4:5)
  const base = [
    "/assets/portfolio/p01.jpg",
    "/assets/portfolio/p02.jpg",
    "/assets/portfolio/p03.jpg",
    "/assets/portfolio/p04.jpg",
  ];

  // 더 보기 펼침(스냅샷에 있는 customers 2x2, 4:5)
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

        {/* 기본 1열 그리드 */}
        <div className="works__grid works__grid--single">
          {base.map((src, i) => (
            <figure key={i} className="frame">
              <img src={src} alt={`portfolio ${i + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>

        {/* 더 보기: 펼치면 2x2 그리드 추가 노출 */}
        {expanded && (
          <div className="works__grid works__grid--more">
            {more.map((src, i) => (
              <figure key={i} className="frame">
                <img src={src} alt={`more ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        )}

        {/* CTA: 더 보기 / 접기 */}
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

      {/* 로컬 스타일 */}
      <style>{`
        .works { padding: 40px 16px 28px; }
        .works__inner { max-width: 860px; margin: 0 auto; }
        .works__title { font-size: 22px; font-weight: 800; margin: 0 0 16px; }

        /* 4:5 프레임 */
        .frame { width: 100%; aspect-ratio: 4 / 5; margin: 0 0 12px; overflow: hidden; border-radius: 14px; }
        .frame img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* 기본: 1열 */
        .works__grid--single { display: grid; grid-template-columns: 1fr; gap: 0; }

        /* 더 보기: 2x2 */
        .works__grid--more {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;
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
