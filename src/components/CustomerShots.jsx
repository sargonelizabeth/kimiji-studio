const REV = "r20250826";
const shots = Array.from({ length: 4 }, (_, i) =>
  `/assets/customers/c${String(i + 1).padStart(2, "0")}.jpg?rev=${REV}`
);

function onImgError(e){
  const el = e.currentTarget;
  const tried = el.dataset.tried || "";
  const base = el.src.split("?")[0];
  const qs = el.src.includes("?") ? "?" + el.src.split("?")[1] : "";

  if (!tried.includes("JPG") && base.toLowerCase().endsWith(".jpg")) {
    el.dataset.tried = tried + "JPG";
    el.src = base.replace(/\.jpg$/i, ".JPG") + qs;
    return;
  }
  if (!tried.includes("JPEG")) {
    el.dataset.tried = tried + "JPEG";
    el.src = base.replace(/\.jpe?g$/i, ".jpeg") + qs;
    return;
  }
  el.style.opacity = "0.25";
  el.alt = "이미지를 불러올 수 없습니다";
}

export default function CustomerShots() {
  const section = { padding: "84px 16px 48px", background: "#0b0b0b", textAlign: "center" };
  const title = { margin: "0 0 12px", fontSize: "clamp(18px, 4vw, 28px)" };
  const desc  = { opacity: .85, fontSize: 12, margin: "0 0 16px" };
  const grid  = { margin: "0 auto", maxWidth: 520, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 };
  const img   = { width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block", borderRadius: 12, background:"#111" };

  return (
    <section id="community" style={section}>
      <h3 className="kj-800" style={title}>고객이 보내준 일상 사진</h3>
      <p style={desc}>실제 고객이 휴대폰으로 보낸 원본 일상 사진 샘플</p>
      <div style={grid}>
        {shots.map((src, i) => (
          <img key={i} src={src} alt={`customer-${i+1}`} style={img} onError={onImgError} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
