export default function Nav(){
  return (
    <nav className="kj-nav">
      <div className="kj-nav__inner">
        <a href="#top" className="kj-nav__brand kj-800">KIMIJI STUDIO</a>

        <div className="kj-nav__links">
          <a href="#works">포트폴리오</a>
          <a href="#community">커뮤니티</a>
        </div>

        <a href="#make" className="kj-nav__cta kj-card" style={{
          display:"inline-flex", alignItems:"center", justifyContent:"center",
          padding:"10px 16px", borderRadius:9999, background:"#fff", color:"#111",
          boxShadow:"0 6px 18px rgba(0,0,0,.25)"
        }}>제작하기</a>
      </div>
    </nav>
  );
}
