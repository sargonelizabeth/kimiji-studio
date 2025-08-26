export default function Footer(){
  const wrap  = { background:"#0a0a0a", color:"#bbb", padding:"32px 16px", marginTop:"24px" };
  const inner = { maxWidth:1160, margin:"0 auto", textAlign:"center" };   // ✅ 중앙 정렬
  const title = { margin:"0 0 12px 0", fontSize:18, color:"#fff" };
  const line  = { margin:"4px 0", fontSize:12, opacity:0.9, whiteSpace:"pre-line" };

  return (
    <footer style={wrap}>
      <div style={inner}>
        <div className="kj-800" style={title}>KIMIJI STUDIO</div>
        <p style={line}>
{`사업자 등록번호: 444-69-00584 (간이과세자)
대표: 최지민
통신판매업 신고번호: 2025-경기군포-0374
경기도 군포시 금산로 13 593호`}
        </p>
      </div>
    </footer>
  );
}
