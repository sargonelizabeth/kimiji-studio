// src/components/Pricing.jsx
export default function Pricing(){
  const wrap = "kj-section kj-surface";
  const inner = { maxWidth:920, margin:"0 auto", display:"grid", gap:16, gridTemplateColumns:"repeat(2, minmax(0,1fr))" };
  const card = { padding:"20px", textAlign:"center" };
  const title = { margin:"0 0 6px", fontSize:"clamp(15px, 2.8vw, 18px)", opacity:.95 };
  const price = { margin:"2px 0 0", fontSize:"clamp(22px, 4.6vw, 32px)", color:"#111" };
  const btn = {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    marginTop:14, padding:"10px 16px", borderRadius:9999,
    background:"#111", color:"#fff", boxShadow:"0 8px 20px rgba(0,0,0,.2)"
  };
  const cta = {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    margin:"22px auto 0", padding:"12px 22px", borderRadius:9999,
    background:"#111", color:"#fff", boxShadow:"0 10px 24px rgba(0,0,0,.25)"
  };

  return (
    <section id="pricing" className={wrap}>
      <h3 className="kj-800 kj-title">가격</h3>
      <div style={inner}>
        <div className="kj-card--light">
          <div style={card}>
            <div style={title}>화보 사진 3장</div>
            <div className="kj-800" style={price}>49,000원</div>
            <a href="#make" className="kj-800" style={btn}>제작하기</a>
          </div>
        </div>
        <div className="kj-card--light">
          <div style={card}>
            <div style={title}>화보 사진 3장 + 영상 1개</div>
            <div className="kj-800" style={price}>99,000원</div>
            <a href="#make" className="kj-800" style={btn}>제작하기</a>
          </div>
        </div>
      </div>

      {/* 가격 아래 공통 CTA 하나 */}
      <a href="#make" className="kj-800" style={cta}>제작하기</a>

      {/* 흰색 구분선 */}
      <hr className="kj-divider" />
    </section>
  );
}
