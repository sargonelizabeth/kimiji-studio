const works = [
  { src:"/assets/portfolio/p01.jpg" }, { src:"/assets/portfolio/p02.jpg" },
  { src:"/assets/portfolio/p03.jpg" }, { src:"/assets/portfolio/p04.jpg" },
];

export default function Portfolio() {
  const section = { padding:"64px 16px", background:"#000", textAlign:"center" };
  const title   = { fontFamily:"Sandoll GothicNeoRound", fontWeight:700, fontSize:"clamp(18px,4vw,28px)", margin:"0 0 20px" };
  const list    = { display:"flex", flexDirection:"column", alignItems:"center", gap:16 };
  const card    = { width:"min(640px,92vw)", borderRadius:16, overflow:"hidden", background:"#111", boxShadow:"0 8px 24px rgba(0,0,0,.35)" };
  const media   = { width:"100%", aspectRatio:"4 / 5", objectFit:"cover", display:"block" };
  const more    = { display:"inline-flex", alignItems:"center", justifyContent:"center",
                    height:44, padding:"0 18px", marginTop:8, borderRadius:9999, background:"#fff", color:"#111",
                    fontFamily:"Sandoll GothicNeoRound", fontWeight:700, fontSize:14, boxShadow:"0 6px 18px rgba(0,0,0,.25)" };

  return (
    <section id="works" style={section}>
      <h3 className="sd-700" style={title}>포트폴리오</h3>
      <div style={list}>
        {works.map((w,i)=>(
          <figure key={i} style={card}><img src={w.src} alt={`work-${i+1}`} style={media}/></figure>
        ))}
      </div>
      <a href="#more-works" className="sd-700" style={more}>더 보러가기</a>
      <div id="more-works" style={{height:1}} />
    </section>
  );
}
