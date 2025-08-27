import { supabase } from '@/lib/supabaseClient.js'

export async function fetchFeed(sort='latest', limit=100) {
  const orderCol = sort === 'popular' ? 'likes_count' : 'created_at'
  const { data, error } = await supabase
    .from('v_photos_stats')
    .select('*')
    .order(orderCol, { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function toggleLike(photo_id, user_id) {
  const { data: existing } = await supabase
    .from('photo_likes')
    .select('*')
    .eq('photo_id', photo_id)
    .eq('user_id', user_id)
    .maybeSingle()

  if (existing) {
    await supabase.from('photo_likes')
      .delete()
      .eq('photo_id', photo_id)
      .eq('user_id', user_id)
    return { liked: false }
  }
  await supabase.from('photo_likes').insert({ photo_id, user_id })
  return { liked: true }
}

export async function addComment(photo_id, user_id, text) {
  return supabase.from('photo_comments').insert({ photo_id, user_id, content: text })
}
