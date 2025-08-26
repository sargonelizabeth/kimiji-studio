export default function Nav() {
  const wrap = {
    position: "fixed", top: 0, left: 0, right: 0, height: 64, zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "#fff", /* 링크 파랑 방지용 상위 컬러 */
  };
  const inner = {
    width: "100%", maxWidth: "1160px", padding: "0 16px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  };
  const brand = { letterSpacing: "-0.01em", fontSize: 20, whiteSpace: "nowrap" };
  const menu = { display: "flex", alignItems: "center", gap: 16, fontSize: 14, letterSpacing: "-0.01em" };
  const cta = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "10px 16px", borderRadius: 9999, background: "#fff", color: "#111",
    fontSize: 14, boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
    transition: "transform .2s ease, box-shadow .2s ease",
  };

  return (
    <nav style={wrap}>
      <div style={inner}>
        <a href="#top" className="sd-700" style={brand}>KIMIJI STUDIO</a>
        <div style={menu}>
          <a href="#works">포트폴리오</a>
          <a href="#community">커뮤니티</a>
          <a
            href="#make"
            className="sd-700"
            style={cta}
            onMouseEnter={(e)=>{e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 10px 24px rgba(0,0,0,0.28)";}}
            onMouseLeave={(e)=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.25)";}}
          >
            제작하기
          </a>
        </div>
      </div>
    </nav>
  );
}
