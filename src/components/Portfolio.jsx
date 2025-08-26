const workModules = import.meta.glob(
  '../assets/portfolio/*.{jpg,JPG,jpeg,JPEG,png,webp}',
  { eager: true, as: 'url' }
);

const works = (function(){
  const order = ['p01','p02','p03','p04'];
  return order.map((name) => {
    const re = new RegExp(`(?:^|/)${name}\\.(?:jpe?g|png|webp)$`, 'i');
    const entry = Object.entries(workModules).find(([path]) => re.test(path));
    return entry ? entry[1] : null;
  }).filter(Boolean);
})();

export default function Portfolio() {
  const section = { padding:"64px 16px", background:"#000", textAlign:"center" };
  const title   = { margin:"0 0 20px", fontSize:"clamp(18px, 4vw, 28px)" };
  const list    = { display:"flex", flexDirection:"column", alignItems:"center", gap:16 };
  const card    = { width:"min(640px, 92vw)", borderRadius:16, overflow:"hidden", background:"#111", boxShadow:"0 8px 24px rgba(0,0,0,.35)" };
  const media   = { width:"100%", aspectRatio:"4 / 5", objectFit:"cover", display:"block", background:"#111" };

  return (
    <section id="works" style={section}>
      <h3 className="kj-800" style={title}>포트폴리오</h3>
      <div style={list}>
        {works.map((src,i)=>(
          <figure key={i} style={card}><img src={src} alt={`work-${i+1}`} style={media} loading="lazy" /></figure>
        ))}
      </div>
    </section>
  );
}
