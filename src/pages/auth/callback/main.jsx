// src/pages/auth/callback/main.jsx
import { supabase } from "@/lib/supabaseClient.js";

(async () => {
  try {
    // PKCE 코드 교환
    await supabase.auth.exchangeCodeForSession({ currentURL: location.href });
  } catch (e) {
    console.error("exchangeCodeForSession failed:", e);
  } finally {
    const url = new URL(location.href);
    const next = url.searchParams.get("next") || "/community.html";
    location.replace(next);
  }
})();
