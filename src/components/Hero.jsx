export default function Hero() {
  const wrap = {
    minHeight: "100svh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", textAlign: "center",
    padding: "0 16px", gap: 12,
  };
  const title = { fontSize: "clamp(36px, 7vw, 72px)", letterSpacing: "-0.02em" };
  const subtitle = { fontSize: "clamp(14px, 3.2vw, 20px)", opacity: 0.9 };
  const btn = {
    marginTop: 16, display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: "12px 20px", borderRadius: 9999, background: "#fff", color: "#111",
    fontSize: "clamp(14px, 2.8vw, 18px)", boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  };

  return (
    <section id="top" style={wrap}>
      <h1 className="kj-800" style={title}>KIMIJI STUDIO</h1>
      <p style={subtitle}>일상에서 스튜디오 화보로!</p>
      <a href="#make" className="kj-800" style={btn}>제작하기</a>
    </section>
  );
}
