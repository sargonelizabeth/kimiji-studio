// (중략) import 등은 기존 그대로

// 업로드 버튼 핸들러(공용)
function onUploadClick(e){
  e.preventDefault();
  // 반드시 사용자 제스처 안에서
  window.__openUpload?.();
}

return (
  <section className="community">
    {/* ...메트릭 영역 그대로... */}

    <div className="gallery-head">
      <h2>사진 갤러리</h2>
      <div className="right">
        {/* 정렬 토글 제거했으면 이 블록은 보여주지 않음 */}
        <button className="upload" onClick={onUploadClick}>업로드</button>
      </div>
    </div>

    <div className="grid">
      {photos.map(p => <Card key={p.id} p={p} authed={!!user} />)}
      {photos.length===0 && <div className="empty">아직 업로드가 없어요. 로그인 후 첫 사진을 올려보세요.</div>}
    </div>
    {/* ...스타일 동일... */}
  </section>
);
