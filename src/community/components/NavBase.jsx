const onAuth = async (e) => {
  e.preventDefault()
  if (user) {
    await supabase.auth.signOut()
    window.location.reload()
  } else {
    window.location.href = '/signup.html'
  }
}

export default NavBase;
