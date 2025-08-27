import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

function noop() {
  return {
    select: () => noop(),
    order: () => noop(),
    range: async () => ({ data: [], error: null }),
    eq: () => noop(),
    single: async () => ({ data: null, error: null }),
    maybeSingle: async () => ({ data: null, error: null }),
    insert: async () => ({ data: null, error: { message: 'noop' } }),
    delete: async () => ({ data: null, error: { message: 'noop' } }),
    update: async () => ({ data: null, error: { message: 'noop' } }),
    limit: async () => ({ data: [], error: null })
  }
}

let supabase
if (url && key) {
  supabase = createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } })
} else {
  console.warn('[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 없음 → no-op 모드')
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe(){} } }, error: null }),
      signOut: async () => undefined,
      signInWithOAuth: async () => { window.location.href = '/signup.html' }
    },
    from: () => noop()
  }
}

export { supabase }
