export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    // JWT может прийти в хэше, если используется Implicit Flow
    const hash = window.location.hash
    const search = window.location.search

    let jwt: string | null = null

    if (hash.includes('access_token') || hash.includes('jwt')) {
      const params = new URLSearchParams(hash.slice(1))
      jwt = params.get('access_token') || params.get('jwt')
    }

    if (search.includes('access_token') || search.includes('jwt')) {
      const params = new URLSearchParams(search)
      jwt = params.get('access_token') || params.get('jwt')
    }

    if (jwt) {
      localStorage.setItem('token', jwt)

      // Удалить токен из URL
      const cleanUrl = window.location.origin + to.path
      window.history.replaceState({}, document.title, cleanUrl)

      // Можно ещё инициировать fetch user profile, если нужно
    }
  }
})
