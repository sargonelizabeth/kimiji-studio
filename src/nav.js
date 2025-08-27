// src/nav.js
import { supabase } from '@/supabaseClient.js';

function getLoginLink() {
  return document.getElementById('login-link');
}

async function setupAuth() {
  const loginLink = getLoginLink();
  if (!loginLink) return;

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
  const loginLink = getLoginLink();
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
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/community.html` }
      });
    };
  }
}

function markActiveLink() {
  const here = window.location.pathname + window.location.hash;
  document.querySelectorAll('.nav-link[data-active-match]').forEach((el) => {
    const key = el.getAttribute('data-active-match');
    if (!key) return;
    if (here.includes(key)) el.setAttribute('aria-current', 'page');
  });
}

function adjustCTA() {
  const cta = document.getElementById('nav-cta');
  if (!cta) return;

  const onCommunity = window.location.pathname.endsWith('/community.html') ||
                      window.location.pathname.endsWith('community.html');

  cta.textContent = onCommunity ? '업로드' : '제작하기';
  cta.href = '/upload.html';
}

window.addEventListener('DOMContentLoaded', () => {
  setupAuth();
  markActiveLink();
  adjustCTA();
});
