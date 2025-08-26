export default function Footer() {
  const wrap = { background:"#0a0a0a", borderTop:"1px solid rgba(255,255,255,.08)", padding:"36px 16px 60px", color:"#fff" };
  const inner= { maxWidth:"1160px", margin:"0 auto", textAlign:"center" };
  const brand= { fontSize:18, letterSpacing:"-0.01em", margin:0 };
  const line = { margin:"6px 0", fontSize:12, opacity:.9 };

  return (
    <footer style={wrap}>
      <div style={inner}>
        <h3 className="sd-700" style={brand}>KIMIJI STUDIO</h3>
        <p style={line}>사업자 등록번호: 444-69-00584 (간이과세자)</p>
        <p style={line}>대표: 최지민</p>
        <p style={line}>통신판매업 신고번호: 2025-경기군포-0374</p>
        <p style={line}>경기도 군포시 금산로 13 593호</p>
        <p style={{ ...line, opacity:.7, marginTop:12 }}>
          © {new Date().getFullYear()} KIMIJI STUDIO · All rights reserved.
        </p>
      </div>
    </footer>
  );
}
