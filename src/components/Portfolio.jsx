// src/components/Portfolio.jsx
const REV = "r20250826-02"; // 캐시버스터

const NAMES = ["p01", "p02", "p03", "p04"];

function buildFallbackUrls(name, primaryDir) {
  const dirs = primaryDir === "portfolio" ? ["portfolio", "customers"] : ["customers", "portfolio"];
  const exts = ["jpg", "JPG", "jpeg", "JPEG", "png", "webp"];
  const urls = [];
  for (const d of dirs) {
    for (const ext of exts) {
      urls.push(`/assets/${d}/${name}.${ext}?rev=${REV}`);
    }
  }
  return urls;
}

function FallbackImg({ name }) {
  const list = buildFallbackUrls(name, "portfolio");
  return (
    <img
      data-list={JSON.stringify(list)}
      data-idx="0"
      src={list[0]}
      alt={name}
      style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block", background: "#111" }}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        const el = e.currentTarget;
        const arr = JSON.parse(el.getAttribute("data-list") || "[]");
        let idx = parseInt(el.getAttribute("data-idx") || "0", 10) + 1;
        if (idx < arr.length) {
          el.setAttribute("data-idx", String(idx));
          el.src = arr[idx];
        } else {
          el.style.opacity = "0.25";
          el.alt = "이미지를 불러올 수 없습니다";
        }
      }}
    />
  );
}

export default function Portfolio() {
  const section = { padding: "64px 16px", background: "#000", textAlign: "center" };
  const title = { margin: "0 0 20px", fontSize: "clamp(18px, 4vw, 28px)" };
  const list = { display: "flex", flexDirection: "column", alignItems: "center", gap: 16 };
  const card = { width: "min(640px, 92vw)", borderRadius: 16, overflow: "hidden", background: "#111", boxShadow: "0 8px 24px rgba(0,0,0,.35)" };

  return (
    <section id="works" style={section}>
      <h3 className="kj-800" style={title}>포트폴리오</h3>
      <div style={list}>
        {NAMES.map((n) => (
          <figure key={n} style={card}>
            <FallbackImg name={n} />
          </figure>
        ))}
      </div>
    </section>
  );
}
