const works = Array.from({ length: 4 }, (_, i) =>
  `/assets/portfolio/p${String(i + 1).padStart(2, "0")}.jpg`
);

export default function Portfolio() {
  const section = { padding:"64px 16px", background:"#000", textAlign:"center" };
  const title   = { margin:"0 0 20px", fontSize:"clamp(18px, 4vw, 28px)" };
  const list    = { display:"flex", flexDirection:"column", alignItems:"center", gap:16 };
  const card    = { width:"min(640px, 92vw)", borderRadius:16, overflow:"hidden", background:"#111", boxShadow:"0 8px 24px rgba(0,0,0,.35)" };
  const media   = { width:"100%", aspectRatio:"4 / 5", objectFit:"cover", display:"block", background:"#111" };

  return (
    <section id="works" style={section}>
      <h3 className="kj-800" style={title}>포트폴리오</h3>
      <div style={list}>
        {works.map((src,i)=>(
          <figure key={i} style={card}>
            <img
              src={src}
              alt={`work-${i+1}`}
              style={media}
              onError={(e)=>{ e.currentTarget.style.opacity='0.3'; e.currentTarget.alt='이미지를 불러올 수 없습니다'; }}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
