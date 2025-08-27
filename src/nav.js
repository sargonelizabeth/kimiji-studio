// /src/nav.js
import { supabase } from '/src/supabaseClient.js'; // 프로젝트 경로에 맞게 유지

// ----- [A] 로그인 토글 (텍스트 링크 유지: 흰 글씨) -----
const loginLink = document.getElementById('login-link');

async function setupAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    renderAuth(session);

    supabase.auth.onAuthStateChange((_event, sessionNow) => {
      renderAuth(sessionNow);
    });
  } catch (e) {
    console.error('[Auth init error]', e);
  }
}

function renderAuth(session) {
  if (!loginLink) return;

  if (session?.user) {
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
      // 필요 시 provider 교체(google/kakao/github 등)
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/community.html` }
      });
    };
  }
}

// ----- [B] 현재 페이지 활성화 표시 -----
function markActiveLink() {
  const here = window.location.pathname + window.location.hash;
  document.querySelectorAll('.nav-link[data-active-match]').forEach((el) => {
    const key = el.getAttribute('data-active-match');
    if (!key) return;
    if (here.includes(key)) el.setAttribute('aria-current', 'page');
  });
}

// ----- [C] 커뮤니티 페이지에서는 CTA 라벨 '업로드' -----
function adjustCTA() {
  const cta = document.getElementById('nav-cta');
  if (!cta) return;

  const onCommunity = window.location.pathname.endsWith('/community.html') ||
                      window.location.pathname.endsWith('community.html');

  // 목적지는 동일하게 /upload.html, 라벨만 바꾼다
  cta.textContent = onCommunity ? '업로드' : '제작하기';
  cta.href = '/upload.html';
}

// init
setupAuth();
markActiveLink();
adjustCTA();
