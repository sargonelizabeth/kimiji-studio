import { useEffect, useRef, useState } from "react";

export default function BgmController() {
  const audioRef = useRef(null);
  const [on, setOn] = useState(() => localStorage.getItem("kmj_bgm_on") !== "0"); // 기본 ON
  const targetVol = 0.6; // 볼륨 목표값(0~1)

  // 최초 마운트: 시도 재생 + 첫 사용자 제스처에서 언락
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    a.loop = true;

    const tryPlay = async () => {
      try {
        await a.play();                   // 일부 브라우저는 무음 상태에서만 통과
        if (!on) a.pause();
        else fadeTo(a, targetVol);
      } catch {}
    };
    tryPlay();

    const unlock = async () => {
      if (!on) return;
      try {
        await a.play();
        fadeTo(a, targetVol);
      } catch {}
      window.removeEventListener("pointerdown", unlock);
    };
    window.addEventListener("pointerdown", unlock, { once: true });

    // 탭 비활성화시 일시정지, 복귀시 재생
    const vis = () => {
      if (document.hidden) a.pause();
      else if (on) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []); // eslint-disable-line

  // 토글될 때마다 상태 저장 + 페이드 처리
  useEffect(() => {
    localStorage.setItem("kmj_bgm_on", on ? "1" : "0");
    const a = audioRef.current;
    if (!a) return;
    if (on) a.play().then(() => fadeTo(a, targetVol)).catch(() => {});
    else fadeTo(a, 0, true);
  }, [on]); // eslint-disable-line

  function fadeTo(a, v, pause = false) {
    const dur = 400;
    const start = a.volume;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      a.volume = start + (v - start) * k;
      if (k < 1) requestAnimationFrame(step);
      else { a.volume = v; if (pause) a.pause(); }
    };
    requestAnimationFrame(step);
  }

  const btn = {
    position: "fixed", right: 16, bottom: 16, zIndex: 9999,
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 14px", borderRadius: 9999, cursor: "pointer", userSelect: "none",
    background: "rgba(17,17,17,.85)", color: "#fff",
    border: "1px solid rgba(255,255,255,.15)",
    boxShadow: "0 10px 24px rgba(0,0,0,.35)",
    backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)"
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" playsInline>
        <source src="/audio/bgm.mp3" type="audio/mpeg" />
        <source src="/audio/bgm.ogg" type="audio/ogg" />
      </audio>

      <button
        type="button"
        onClick={() => setOn(s => !s)}
        style={btn}
        aria-pressed={on}
        aria-label={on ? "배경음악 끄기" : "배경음악 켜기"}
      >
        <span aria-hidden="true">{on ? "🔊" : "🔈"}</span>
        <span className="kj-800" style={{ fontSize: 14 }}>{on ? "사운드 ON" : "사운드 OFF"}</span>
      </button>
    </>
  );
}
