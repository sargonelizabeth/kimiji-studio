import React from "react"

export default function Pricing(){
  return (
    <section id="pricing" className="pricing">
      <div className="wrap">
        <div className="cards">
          <div className="card">
            <div className="big">화보 사진 3장 49,000원</div>
            <div className="small">보정 + 고해상도 파일 제공</div>
          </div>
          <div className="card">
            <div className="big">화보 사진 3장 + 영상 1개 99,000원</div>
            <div className="small">편집 + BGM 포함</div>
          </div>
        </div>

        <div className="cta">
          <a className="btn" href="/upload.html">제작하기</a>
        </div>

        <hr className="sep" />

        <div className="sns">
          <a className="ig" href="https://instagram.com/" target="_blank" rel="noreferrer">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5A5.5 5.5 0 1 1 6.5 13A5.5 5.5 0 0 1 12 7.5m0 2A3.5 3.5 0 1 0 15.5 13A3.5 3.5 0 0 0 12 9.5M17.5 6A1.5 1.5 0 1 1 16 7.5A1.5 1.5 0 0 1 17.5 6"/></svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>

      <style>{`
        .pricing{padding:32px 16px;color:#fff}
        .wrap{max-width:960px;margin:0 auto}
        .cards{display:grid;grid-template-columns:1fr;gap:12px}
        @media(min-width:760px){.cards{grid-template-columns:1fr 1fr}}
        .card{background:rgba(0,0,0,.30);border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:18px 16px;min-height:112px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
        .big{font-family:'NotoSansKR-ExtraBold',system-ui,Arial;font-size:clamp(18px,2.6vw,22px);line-height:1.25}
        .small{font-family:'NotoSansKR-SemiBold',system-ui,Arial;opacity:.9;margin-top:8px}
        .cta{display:flex;justify-content:center;margin:18px 0 8px}
        .btn{background:#fff;color:#000;font-weight:800;border-radius:999px;padding:12px 24px;text-decoration:none}
        .btn:hover{filter:brightness(.96)}
        .sep{border:0;border-top:1px solid rgba(255,255,255,.22);margin:14px 0}
        .sns{display:flex;justify-content:center}
        .ig{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.10);padding:10px 16px;border-radius:999px;color:#fff;text-decoration:none}
        .ig:hover{background:rgba(255,255,255,.16)}
      `}</style>
    </section>
  )
}
