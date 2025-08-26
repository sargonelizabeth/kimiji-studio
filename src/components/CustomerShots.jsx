const shots = [
  "/assets/customers/c01.jpg","/assets/customers/c02.jpg","/assets/customers/c03.jpg","/assets/customers/c04.jpg",
  "/assets/customers/c05.jpg","/assets/customers/c06.jpg","/assets/customers/c07.jpg","/assets/customers/c08.jpg",
];

export default function CustomerShots() {
  const section = { padding: "84px 16px 48px", background: "#0b0b0b", textAlign: "center" };
  const title = { margin: "0 0 12px", fontSize: "clamp(18px, 4vw, 28px)" };
  const desc  = { opacity: .85, fontSize: 12, margin: "0 0 16px" };
  const grid  = { margin: "0 auto", maxWidth: 420, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 };
  const img   = { width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" };

  return (
    <section id="community" style={section}>
      <h3 className="sd-700" style={title}>고객이 보내준 일상 사진</h3>
      <p style={desc}>실제 고객이 휴대폰으로 보낸 원본 일상 사진 샘플</p>
      <div style={grid}>
        {shots.slice(0,8).map((src,i)=><img key={i} src={src} alt={`customer-${i+1}`} style={img}/>)}
      </div>
    </section>
  );
}
