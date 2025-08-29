// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }


})

// OAuth 콜백 파라미터가 보이면 세션 교환 시도
if (typeof window !== "undefined") {
  const hasCode = window.location.search.includes("code=");
  if (hasCode) {
    supabase.auth.exchangeCodeForSession(window.location.href).catch(()=>{});
  }
}

