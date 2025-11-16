import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null)
  const username = ref<string | null>(null)

  const isLoggedIn = computed(() => !!userId.value && !!username.value)

  function hydrate() {
    const raw = localStorage.getItem('user')
    if (!raw) return
    const parsed = JSON.parse(raw)
    userId.value = parsed.userId
    username.value = parsed.username
  }

  function setUser(newUserId: string, newUsername: string) {
    userId.value = newUserId
    username.value = newUsername
    localStorage.setItem('user', JSON.stringify({ userId: newUserId, username: newUsername }))
  }

  function logout() {
    userId.value = null
    username.value = null
    localStorage.removeItem('user')
  }

  return { userId, username, isLoggedIn, hydrate, setUser, logout }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
