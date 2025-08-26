export default function SocialBar() {
  const wrap = { padding:"24px 16px", textAlign:"center", background:"#000" };
  const btn  = { display:"inline-flex", alignItems:"center", gap:8, padding:"10px 14px",
                 borderRadius:9999, background:"#fff", color:"#111",
                 fontFamily:"Sandoll GothicNeoRound", fontWeight:700, fontSize:14,
                 boxShadow:"0 6px 18px rgba(0,0,0,.25)" };
  return (
    <div style={wrap}>
      <a href="https://instagram.com" target="_blank" rel="noreferrer" style={btn}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#111"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
        Instagram
      </a>
    </div>
  );
}
