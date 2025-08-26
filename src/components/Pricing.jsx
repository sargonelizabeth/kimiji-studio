export default function Pricing() {
  const wrap = { padding:"48px 16px 72px", background:"#0b0b0b", textAlign:"center" };
  const grid = { margin:"0 auto", maxWidth:800, display:"grid", gap:16, gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))" };
  const box  = { borderRadius:16, padding:"20px 18px",
                 background:"linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))",
                 border:"1px solid rgba(255,255,255,.12)", boxShadow:"0 8px 24px rgba(0,0,0,.35)" };
  const name = { margin:0, fontSize:16, letterSpacing:"-0.01em" };
  const price= { margin:"8px 0 0", fontSize:22 };
  const small= { margin:"6px 0 0", opacity:.85, fontSize:12 };

  return (
    <section style={wrap}>
      <div style={grid}>
        <div style={box}>
          <h4 className="sd-700" style={name}>스튜디오 사진 3장</h4>
          <p  className="sd-700" style={price}>49,000원</p>
          <p  style={small}>보정 포함 · 고해상도 파일 제공</p>
        </div>
        <div style={box}>
          <h4 className="sd-700" style={name}>스튜디오 사진 3장 + 영상 1개</h4>
          <p  className="sd-700" style={price}>99,000원</p>
          <p  style={small}>보정 포함 · 세로 영상 1개 제공</p>
        </div>
      </div>
    </section>
  );
}
