// src/nav.js
import { supabase } from '@/supabaseClient.js';

function markActiveLink() {
  const here = (location.pathname + location.search + location.hash).toLowerCase();
  document.querySelectorAll('.site-nav .nav-link[data-active-match]').forEach((el) => {
    const key = (el.getAttribute('data-active-match') || '').toLowerCase();
    if (key && here.includes(key)) el.setAttribute('aria-current', 'page');
  });
}

async function setupAuth() {
  const loginLink = document.getElementById('login-link');
  if (!loginLink) return;

  const { data: { session } } = await supabase.auth.getSession();
  render(session);
  supabase.auth.onAuthStateChange((_e, next) => render(next));

  function render(s) {
    if (s?.user) {
      loginLink.textContent = '로그아웃';
      loginLink.href = '#';
      loginLink.onclick = async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
        location.reload();
      };
    } else {
      loginLink.textContent = '로그인';
      loginLink.href = '#';
      loginLink.onclick = async (e) => {
        e.preventDefault();
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${location.origin}/community.html` }
        });
      };
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  markActiveLink();
  setupAuth();
});
