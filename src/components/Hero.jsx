import React from "react";

export default function Hero() {
  return (
    <>
      {/* ── 블록 1: TOP 히어로 (bg.mp4, 두 줄 고정 + CTA) ───────────────── */}
      <section id="top" className="hero hero--primary">
        <video
          className="hero__bg"
          src="/videos/bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/bg-poster.jpg"
        />
        <div className="hero__overlay">
          <h1 className="hero__title">KIMIJI STUDIO</h1>
          <p className="hero__tag">일상에서 스튜디오 화보로!</p>

          {/* 정확히 두 줄: 각 줄을 span으로 분리하고 작은 화면에서 block+nowrap */}
          <p className="hero__desc hero__desc--twolines">
            <span className="hero__line">사진관에 가지 않아도 우리 아이의 일상을</span>
            <span className="hero__line">스튜디오 사진으로 남길 수 있어요!</span>
          </p>

          <a href="#make" className="btn hero__cta">제작하기</a>
        </div>
      </section>

      {/* ── 블록 2: 스토리(소개) 섹션 (bg2.mp4 + 카피) ───────────────────── */}
      <section id="community" className="hero hero--story">
        <video
          className="hero__bg"
          src="/videos/bg2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/bg2-poster.jpg"
        />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__overlay">
          <p className="story__copy">{`KIMIJI STUDIO는
단순히 예쁜 이미지를 만드는 곳이 아닙니다.
우리는 기억 속 감정을 꺼내
그 장면을 새롭게 설계하고,
다시 복원해내는 '기억의 작가'들 입니다.

그 날, 당신은 무엇을 느꼈고,
무엇을 함께 했나요?

그날을 기억하는 아이의 감정과 당신의 시선,
그 따스한 장면을 바탕으로
우리는 화보의 씬을 섬세하게 설계합니다.`}</p>
        </div>
      </section>

      {/* ── 이 컴포넌트 전용 스타일 ───────────────────────────────────── */}
      <style>{`
        /* 공통 레이아웃 */
        .hero { position: relative; width: 100%; min-height: 100vh; overflow: hidden; }
        .hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

        .hero__overlay {
          position: relative; z-index: 2;
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 16vh 16px 18vh;
        }

        /* TOP 히어로 타이포 */
        .hero__title {
          color: #fff; font-weight: 800; letter-spacing: .2px;
          font-size: clamp(28px, 7vw, 48px);
          text-shadow: 0 2px 8px rgba(0,0,0,.35); margin: 0 0 8px;
        }
        .hero__tag {
          color: #fff; opacity: .95; margin: 0 0 8px;
          font-size: clamp(14px, 3.6vw, 18px);
          text-shadow: 0 1px 4px rgba(0,0,0,.25);
        }
        .hero__desc {
          color: #fff; opacity: .95; margin: 0;
          line-height: 1.45; font-size: clamp(14px, 3.8vw, 18px);
          text-shadow: 0 1px 4px rgba(0,0,0,.25);
          word-break: keep-all;
        }

        /* 정확히 두 줄을 위한 설정 */
        .hero__desc--twolines .hero__line { display: inline; }
        .hero__cta { margin-top: 20px; }

        /* 버튼 스타일 */
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 20px; border-radius: 999px; border: 0; cursor: pointer;
          background: #fff; color: #111; font-weight: 800; text-decoration: none;
          box-shadow: 0 8px 24px rgba(0,0,0,.18);
        }

        /* 작은 화면(아이폰 12 mini 포함)에서 두 줄 강제 + 오버플로 방지 */
        @media (max-width: 430px) {
          .hero__desc--twolines .hero__line { display: block; white-space: nowrap; }
        }
        @media (max-width: 390px) {
          .hero__desc { font-size: 14px; }
        }
        @media (max-width: 360px) {
          .hero__desc { font-size: 13px; } /* 12 mini 안전 범위 */
        }

        /* 스토리 블록(두 번째) */
        .hero--story .hero__overlay { padding: 64px 16px; }
        .hero__shade {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.45) 60%, rgba(0,0,0,.35) 100%);
        }
        .story__copy {
          color: #fff; white-space: pre-line; text-wrap: balance; word-break: keep-all;
          font-weight: 600; line-height: 1.65; text-align: left;
          font-size: clamp(14px, 3.9vw, 20px);
          max-width: 820px; margin: 0 auto;
          text-shadow: 0 2px 10px rgba(0,0,0,.35);
          background: rgba(0,0,0,.18); padding: 16px 18px; border-radius: 14px;
        }
        @media (max-width: 390px) {
          .hero--story .hero__overlay { padding: 56px 16px 72px; }
          .story__copy { font-size: 15px; line-height: 1.6; }
        }
      `}</style>
    </>
  );
}
