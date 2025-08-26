const items = [
  { src: "/assets/portfolio/01.jpg", title: "Scene 01" },
  { src: "/assets/portfolio/02.jpg", title: "Scene 02" },
  { src: "/assets/portfolio/03.jpg", title: "Scene 03" },
  { src: "/assets/portfolio/04.jpg", title: "Scene 04" },
  { src: "/assets/portfolio/05.jpg", title: "Scene 05" },
  { src: "/assets/portfolio/06.jpg", title: "Scene 06" },
  { src: "/assets/portfolio/07.jpg", title: "Scene 07" },
  { src: "/assets/portfolio/08.jpg", title: "Scene 08" },
];

export default function Portfolio() {
  const section = {
    position: "relative",
    padding: "96px 16px",
    background: "#0b0b0b",
  };

  const header = {
    maxWidth: "var(--container-max)",
    margin: "0 auto 20px",
    textAlign: "center",
  };

  const h2 = {
    fontFamily: "Sandoll GothicNeoRound",
    fontWeight: 700,
    fontSize: "clamp(20px, 4.2vw, 36px)",
    letterSpacing: "-0.01em",
    margin: 0,
  };

  const gridWrap = {
    maxWidth: "var(--container-max)",
    margin: "24px auto 0",
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  };

  const card = {
    position: "relative",
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    background: "#111",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  };

  const media = {
    width: "100%",
    height: "100%",
    aspectRatio: "4 / 5", // 인스타 느낌
    objectFit: "cover",
    display: "block",
  };

  const caption = {
    position: "absolute",
    left: 0, right: 0, bottom: 0,
    padding: "10px 12px",
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 100%)",
    fontSize: 12,
  };

  return (
    <section id="works" style={section}>
      <div style={header}>
        <h2 style={h2}>포트폴리오</h2>
      </div>
      <div style={gridWrap}>
        {items.map((it, idx) => (
          <figure key={idx} style={card}>
            <img src={it.src} alt={it.title} style={media} />
            <figcaption style={caption}>{it.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
