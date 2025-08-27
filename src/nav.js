// src/nav.js
import { supabase } from '@/supabaseClient.js';

function headerMarkup() {
  return `
    <div class="nav-top container">
      <a href="/" class="brand" aria-label="KIMIJI STUDIO 홈으로">KIMIJI STUDIO</a>
      <a href="#" id="login-link" class="login-link">로그인</a>
    </div>
    <nav class="nav-bottom container" aria-label="주요 메뉴">
      <ul class="nav-links">
        <li><a href="/#portfolio" class="nav-link" data-active-match="#portfolio">포트폴리오</a></li>
        <li><a href="/community.html" class="nav-link" data-active-match="community.html">커뮤니티</a></li>
        <li><a href="/#about" class="nav-link" data-active-match="#about">About</a></li>
        <li><a href="/upload.html" id="nav-cta" class="btn btn-cta">제작하기</a></li>
      </ul>
    </nav>
  `;
}

function ensureHeader() {
  let header = document.querySelector('.site-nav');
  if (!header) {
    header = document.createElement('header');
    header.className = 'site-nav';
    header.innerHTML = headerMarkup();
    document.body.prepend(header);
  }
  return header;
}

function markActiveLink() {
  const here = (window.location.pathname + window.location.search + window.location.hash).toLowerCase();
  document.querySelectorAll('.site-nav .nav-link[data-active-match]').forEach((el) => {
    const key = (el.getAttribute('data-active-match') || '').toLowerCase();
    if (key && here.includes(key)) el.setAttribute('aria-current', 'page');
  });
}

function adjustCTA() {
  const cta = document.getElementById('nav-cta');
  if (!cta) return;
  const path = window.location.pathname.toLowerCase();
  const onCommunity = path.endsWith('/community.html') || path.includes('/community');
  cta.textContent = onCommunity ? '업로드' : '제작하기';
  cta.href = '/upload.html';
}

async function setupAuth() {
  const loginLink = document.getElementById('login-link');
  if (!loginLink) return;

  const { data: { session } } = await supabase.auth.getSession();
  renderAuth(session);

  supabase.auth.onAuthStateChange((_event, sessionNow) => {
    renderAuth(sessionNow);
  });

  function renderAuth(sessionData) {
    if (sessionData?.user) {
      loginLink.textContent = '로그아웃';
      loginLink.href = '#';
      loginLink.onclick = async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
        window.location.reload();
      };
    } else {
      loginLink.textContent = '로그인';
      loginLink.href = '#';
      loginLink.onclick = async (e) => {
        e.preventDefault();
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${window.location.origin}/community.html` }
        });
      };
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  ensureHeader();   // 없으면 주입
  markActiveLink(); // 현재 페이지 표시
  adjustCTA();      // 커뮤니티 → '업로드'
  await setupAuth();
});
