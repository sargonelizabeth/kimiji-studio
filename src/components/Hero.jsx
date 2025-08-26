// src/components/Hero.jsx
const REV = "tx-20250826-01";

function pickTexture(){
  const list = [
    "/textures/tx01.jpg",
    "/textures/tx02.jpg",
    "/textures/tx03.jpg",
  ];
  // 존재 여부를 미리 체크하지 않고 세팅, 로드 실패 시 CSS 폴백만 보임
  const i = Math.floor(Math.random()*list.length);
  return `${list[i]}?rev=${REV}`;
}

export default function Hero(){
  const bgUrl = pickTexture();

  const wrap = {
    position:"relative",
    width:"100vw", height:"100vh",
  };

  const bg = {
    position:"absolute", inset:0,
    backgroundImage: `url('${bgUrl}')`,
    backgroundSize:"cover",
    backgroundPosition:"center",
    filter:"saturate(1.05) contrast(1.05)",
  };

  const topGroup = { position:"absolute", top:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, textAlign:"center", padding:"0 16px" };
  const bottomGroup = { position:"absolute", bottom:"7vh", left:"50%", transform:"translateX(-50%)", zIndex:2, textAlign:"center", padding:"0 16px" };
  const line = { display:"block", whiteSpace:"nowrap", wordBreak:"keep-all" };

  return (
    <section id="top" className="kj-texture" style={wrap}>
      <div style={bg} aria-hidden="true" />
      {/* 오버레이들은 ::before/::after로 들어감 */}

      <div style={topGroup}>
        <h1 className="kj-800 kj-softshadow" style={{
          margin:0, letterSpacing:"-0.02em",
          fontSize:"clamp(36px, 7vw, 84px)",
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"
        }}>KIMIJI STUDIO</h1>

        <p className="kj-softshadow" style={{ margin:"10px 0 0 0", fontSize:"clamp(14px,3.2vw,22px)" }}>
          일상에서 스튜디오 화보로!
        </p>
      </div>

      <div style={bottomGroup}>
        <p className="kj-softshadow" style={{ margin:0, lineHeight:1.5, fontSize:"clamp(13px,3vw,18px)", letterSpacing:"-0.01em" }}>
          <span style={line}>사진관에 가지 않아도 <strong>우리 아이의 일상을</strong></span>
          <span style={line}>스튜디오 사진으로 남길 수 있어요!</span>
        </p>

        <a href="#make" className="kj-800"
           style={{ display:"inline-flex", alignItems:"center", justifyContent:"center",
                    marginTop:16, padding:"12px 20px", borderRadius:9999,
                    background:"#fff", color:"#111", boxShadow:"0 6px 18px rgba(0,0,0,.35)" }}>
          제작하기
        </a>
      </div>
    </section>
  );
}
