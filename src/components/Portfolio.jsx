const works=[
  "/assets/portfolio/p01.jpg",
  "/assets/portfolio/p02.jpg",
  "/assets/portfolio/p03.jpg",
  "/assets/portfolio/p04.jpg",
];

function onImgError(e){
  const el=e.currentTarget, tried=el.dataset.tried||"", base=el.src.split("?")[0];
  if(!tried.includes("JPG") && base.toLowerCase().endsWith(".jpg")){ el.dataset.tried=tried+"JPG"; el.src=base.replace(/\.jpg$/i,".JPG"); return; }
  if(!tried.includes("JPEG")){ el.dataset.tried=tried+"JPEG"; el.src=base.replace(/\.jpe?g$/i,".jpeg"); return; }
  el.style.opacity="0.25"; el.alt="이미지를 불러올 수 없습니다";
}

export default function Portfolio() {
  const list={ display:"flex", flexDirection:"column", alignItems:"center", gap:16 };
  const card={ width:"min(640px,92vw)", borderRadius:16, overflow:"hidden", background:"#111", boxShadow:"0 8px 24px rgba(0,0,0,.35)" };
  const media={ width:"100%", aspectRatio:"4 / 5", objectFit:"cover", display:"block", background:"#111" };

  return (
    <section id="works" className="kj-section kj-surface">
      <div className="kj-container kj-center">
        <h3 className="kj-800 kj-title">포트폴리오</h3>
        <div style={list}>
          {works.map((src,i)=>(
            <figure key={i} style={card}><img src={src} alt={`work-${i+1}`} style={media} onError={onImgError} loading="lazy" /></figure>
          ))}
        </div>
      </div>
    </section>
  );
}
