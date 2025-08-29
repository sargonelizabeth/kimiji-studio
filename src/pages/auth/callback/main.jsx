import { supabase } from "@/lib/supabaseClient.js";

// Supabase OAuth code → 세션으로 교환
(async () => {
  try {
    await supabase.auth.exchangeCodeForSession(window.location.href);
  } catch(e) {
    // ignore – 이미 세션이 있거나 한번 처리됨
  }
  const url = new URL(window.location.href);
  const next = localStorage.getItem("postAuthRedirect")
            || url.searchParams.get("next")
            || "/community.html";
  localStorage.removeItem("postAuthRedirect");
  window.location.replace(next);
})();
