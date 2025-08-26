export default function Footer() {
  const wrap = {
    background: "#0a0a0a",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "36px 16px 60px",
  };
  const inner = {
    maxWidth: "var(--container-max)",
    margin: "0 auto",
    textAlign: "center",
  };
  const brand = {
    fontFamily: "Sandoll GothicNeoRound",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: "-0.01em",
    margin: 0,
  };
  const small = {
    fontFamily: "Sandoll GothicNeoRound",
    fontWeight: 400,
    opacity: 0.8,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 16,
  };
  const icons = {
    display: "flex",
    justifyContent: "center",
    gap: 14,
    marginTop: 8,
  };
  const iconBtn = {
    width: 36, height: 36,
    borderRadius: 18,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.06)",
    transition: "transform .2s ease",
  };

  return (
    <footer style={wrap}>
      <div style={inner}>
        <h3 style={brand}>KIMIJI STUDIO</h3>
        <p style={small}>
          © {new Date().getFullYear()} KIMIJI STUDIO · All rights reserved.
        </p>
        <div style={icons}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" style={iconBtn}
            onMouseEnter={(e)=>e.currentTarget.style.transform="translateY(-1px)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="translateY(0)"}
          >
            {/* Instagram 아이콘 */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" opacity="0.9">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10z"/>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" style={iconBtn}
            onMouseEnter={(e)=>e.currentTarget.style.transform="translateY(-1px)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="translateY(0)"}
          >
            {/* YouTube 아이콘 */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" opacity="0.9">
              <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.8 15.5v-7l6 3.5-6 3.5z"/>
            </svg>
          </a>
          {/* 필요하면 카카오톡/스레드 등 추가 */}
        </div>
      </div>
    </footer>
  );
}
