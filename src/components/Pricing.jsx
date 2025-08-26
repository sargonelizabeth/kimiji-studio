// src/components/Pricing.jsx
export default function Pricing(){
  const wrap = { padding:"64px 16px 24px", textAlign:"center", background:"#000" };
  const inner = { maxWidth:920, margin:"0 auto", display:"grid", gap:16, gridTemplateColumns:"repeat(2, minmax(0,1fr))" };

  const card = { padding:"20px", textAlign:"center" };
  const title = { margin:"0 0 6px", fontSize:"clamp(15px, 2.8vw, 18px)", opacity:.95 };
  const price = { margin:"2px 0 0", fontSize:"clamp(22px, 4.6vw, 32px)" };
  const btn = {
    display:"inline-flex", alignItems:"center", justifyContent:"center",
    marginTop:14, padding:"10px 16px", borderRadius:9999,
    background:"#fff", color:"#111", boxShadow:"0 8px 20px rgba(0,0,0,.3)"
  };

  return (
    <section id="pricing" className="kj-section" style={wrap}>
      <h3 className="kj-800 kj-title" style={{marginBottom:12}}>가격</h3>
      <div style={inner}>
        <div className="kj-card">
          <div style={card}>
            <div style={title}>화보 사진 3장</div>
            <div className="kj-800" style={price}>49,000원</div>
            <a href="#make" className="kj-800" style={btn}>제작하기</a>
          </div>
        </div>

        <div className="kj-card">
          <div style={card}>
            <div style={title}>화보 사진 3장 + 영상 1개</div>
            <div className="kj-800" style={price}>99,000원</div>
            <a href="#make" className="kj-800" style={btn}>제작하기</a>
          </div>
        </div>
      </div>
      <p style={{margin:"10px 0 0", fontSize:12, opacity:.75}}>부가세/옵션 별도 고지 가능</p>
    </section>
  );
}
