export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-wrap">
        <div className="pricing-row">
          <div className="pricing-box">
            <p className="pricing-title">화보 사진 3장</p>
            <p className="pricing-price">49,000원</p>
            <p className="subtext">보정 + 고해상도 파일 제공</p>
          </div>
          <div className="pricing-box">
            <p className="pricing-title">화보 사진 3장 + 영상 1개</p>
            <p className="pricing-price">99,000원</p>
            <p className="subtext">편집 + BGM 포함</p>
          </div>
        </div>

        <div className="pricing-cta-wrap">
          <a className="btn-cta-global" href="/upload.html" aria-label="제작하기">제작하기</a>
        </div>
      </div>
    </section>
  )
}
