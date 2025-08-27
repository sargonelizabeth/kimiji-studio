// src/community/components/SortBar.jsx
export default function SortBar({ sort, onChange }) {
  return (
    <div style={{display:'flex', gap:8, justifyContent:'center', padding:'12px 0'}}>
      <button className="btn-cta-global" onClick={() => onChange('latest')} aria-pressed={sort==='latest'}>최신순</button>
      <button className="btn-cta-global" onClick={() => onChange('popular')} aria-pressed={sort==='popular'}>인기순</button>
    </div>
  )
}
