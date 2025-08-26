const INSTAGRAM_URL = "https://instagram.com/kimiji.studio"; // 필요 시 수정

export default function SocialBar(){
  const wrap = { display:"flex", justifyContent:"center", margin:"40px 0 12px" };
  const btn  = {
    display:"inline-flex", alignItems:"center", gap:10,
    padding:"10px 16px", borderRadius:9999, background:"#fff", color:"#111",
    boxShadow:"0 8px 24px rgba(0,0,0,.25)"
  };
  const icon = { width:20, height:20, display:"block" };

  return (
    <div style={wrap}>
      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={btn} className="kj-800" aria-label="Instagram으로 이동">
        <svg viewBox="0 0 24 24" fill="currentColor" style={icon} aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM18 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        Instagram
      </a>
    </div>
  );
}
