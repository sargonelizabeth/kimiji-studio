// 파일 상단 가까이에 있는 rev 값을 새로 바꿔치기
const REV = "r20250826-03";  // 예: 현재 시각으로 바꿔도 됨


// c01~c04를 기본으로 사용
const NAMES = ["c01", "c02", "c03", "c04"];

// name과 기본 디렉토리를 받아서, 디렉토리/확장자 폴백 리스트 생성
function buildFallbackUrls(name, primaryDir) {
  const dirs = primaryDir === "customers" ? ["customers", "portfolio"] : ["portfolio", "customers"];
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
  const list = buildFallbackUrls(name, "customers");
  return (
    <img
      data-list={JSON.stringify(list)}
      data-idx="0"
      src={list[0]}
      alt={name}
      style={{
        width: "100%",
        aspectRatio: "4 / 5",
        objectFit: "cover",
        display: "block",
        borderRadius: 12,
        background: "#111",
      }}
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

export default function CustomerShots() {
  const section = { padding: "84px 16px 48px", background: "#0b0b0b", textAlign: "center" };
  const title = { margin: "0 0 12px", fontSize: "clamp(18px, 4vw, 28px)" };
  const desc = { opacity: 0.85, fontSize: 12, margin: "0 0 16px" };
  const grid = {
    margin: "0 auto",
    maxWidth: 520,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 8,
  };

  return (
    <section id="community" style={section}>
      <h3 className="kj-800" style={title}>고객이 보내준 일상 사진</h3>
      <p style={desc}>실제 고객이 휴대폰으로 보낸 원본 일상 사진 샘플</p>
      <div style={grid}>
        {NAMES.map((n) => (
          <FallbackImg key={n} name={n} />
        ))}
      </div>
    </section>
  );
}
