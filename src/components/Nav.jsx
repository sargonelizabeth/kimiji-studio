// 홈 네비 예시
export default function Nav() {
  return (
    <nav className="kj-nav">
      <div className="kj-container kj-nav__inner">
        <a href="/" className="kj-brand">KIMIJI STUDIO</a>
        <div className="kj-nav__links">
          <a href="/#works">포트폴리오</a>
          <a href="/community.html">커뮤니티</a>
          <a href="/#make">제작하기</a>
        </div>
      </div>
    </nav>
  );
}
