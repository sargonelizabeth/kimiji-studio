const shots = ["/assets/customers/c01.jpg","/assets/customers/c02.jpg","/assets/customers/c03.jpg","/assets/customers/c04.jpg"];

function onImgError(e){
  const el=e.currentTarget, tried=el.dataset.tried||"", base=el.src.split("?")[0];
  if(!tried.includes("JPG") && base.toLowerCase().endsWith(".jpg")){ el.dataset.tried=tried+"JPG"; el.src=base.replace(/\.jpg$/i,".JPG"); return; }
  if(!tried.includes("JPEG")){ el.dataset.tried=tried+"JPEG"; el.src=base.replace(/\.jpe?g$/i,".jpeg"); return; }
  el.style.opacity="0.25"; el.alt="이미지를 불러올 수 없습니다";
}

export default function CustomerShots() {
  const grid={ margin:"0 auto", maxWidth:520, display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:8 };
  const img={ width:"100%", aspectRatio:"4 / 5", objectFit:"cover", display:"block", borderRadius:12, background:"#eee" };
  return (
    <section id="community" className="kj-section kj-surface">
      <h3 className="kj-800 kj-title">고객이 보내준 일상 사진</h3>
      <p className="kj-sub">실제 고객이 휴대폰으로 보낸 원본 일상 사진 샘플</p>
      <div style={grid}>
        {shots.map((src,i)=>(<img key={i} src={src} alt={`customer-${i+1}`} style={img} onError={onImgError} loading="lazy" />))}
      </div>
    </section>
  );
}
