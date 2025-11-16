import { acceptHMRUpdate, defineStore } from 'pinia'

interface UserState {
  userId: string | null
  username: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
    username: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.userId && !!state.username,
  },
  actions: {
    hydrate() {
      const raw = localStorage.getItem('user')
      if (!raw) return
      const parsed = JSON.parse(raw)
      this.userId = parsed.userId
      this.username = parsed.username
    },
    setUser(userId: string, username: string) {
      this.userId = userId
      this.username = username
      localStorage.setItem('user', JSON.stringify({ userId, username }))
    },
    logout() {
      this.userId = null
      this.username = null
      localStorage.removeItem('user')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
