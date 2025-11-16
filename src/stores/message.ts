import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Message = {
  id: string
  conversationId: string
  senderId: string
  text: string
  createdAt: string
}

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Record<string, Message[]>>({}) // keyed by conversationId

  function addMessage(message: Message) {
    if (!messages.value[message.conversationId]) {
      messages.value[message.conversationId] = []
    }
    messages.value[message.conversationId]!.push(message)
  }

  const getMessagesByConversation = (conversationId: string) =>
    computed(() => messages.value[conversationId] ?? [])

  return { messages, addMessage, getMessagesByConversation }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessagesStore, import.meta.hot))
}
