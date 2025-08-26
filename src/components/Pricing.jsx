// src/components/Pricing.jsx
export default function Pricing(){
  const wrap = "kj-section kj-surface";
  const box  = {
    width:"min(920px, 92vw)",
    margin:"0 auto 16px",
    padding:"22px 18px",
    textAlign:"center"
  };
  const title = {
    margin:"0 0 8px",
    fontSize:"clamp(16px, 3.4vw, 22px)",
    color:"#111"
  };
  const subtitle = {
    margin:0,
    fontSize:"clamp(12px, 2.6vw, 14px)",
    opacity:.8,
    color:"#111"
  };
  const btnBottom = {
    display:"inline-flex",
    alignItems:"center",
    justifyContent:"center",
    margin:"18px auto 0",
    padding:"12px 22px",
    borderRadius:9999,
    background:"#111",
    color:"#fff",
    boxShadow:"0 10px 24px rgba(0,0,0,.25)"
  };

  return (
    <section id="pricing" className={wrap}>
      <div className="kj-container kj-center">
        <h3 className="kj-800 kj-title" style={{marginBottom:16}}>가격</h3>

        {/* 가로로 긴 박스 1 (버튼 제거) */}
        <div className="kj-card--light" style={box}>
          <div className="kj-800" style={title}>화보 사진 3장 49,000원</div>
          <p style={subtitle}>보정 포함, 고화질 사진 제공</p>
        </div>

        {/* 가로로 긴 박스 2 (버튼 제거) */}
        <div className="kj-card--light" style={box}>
          <div className="kj-800" style={title}>화보 사진 3장 + 영상 1개 99,000원</div>
          <p style={subtitle}>편집, BGM 포함</p>
        </div>

        {/* 하단 공통 CTA */}
        <a href="#make" className="kj-800" style={btnBottom}>제작하기</a>

        {/* 흰색 구분선 */}
        <hr className="kj-divider" />
      </div>
    </section>
  );
}
