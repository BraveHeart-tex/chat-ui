import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Conversation {
  id: string
  participantIds: string[]
  lastMessageId?: string
  unreadCount: number
  updatedAt: string
  title?: string
}

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['user-1', 'user-2'],
    lastMessageId: 'msg-1',
    unreadCount: 2,
    updatedAt: '2025-11-16T08:15:00Z',
    title: 'Alice',
  },
  {
    id: 'conv-2',
    participantIds: ['user-1', 'user-3'],
    lastMessageId: 'msg-5',
    unreadCount: 0,
    updatedAt: '2025-11-15T17:42:00Z',
    title: 'Bob',
  },
  {
    id: 'conv-3',
    participantIds: ['user-1', 'user-4', 'user-5'],
    lastMessageId: 'msg-9',
    unreadCount: 1,
    updatedAt: '2025-11-15T12:30:00Z',
    title: 'Team Project',
  },
  {
    id: 'conv-4',
    participantIds: ['user-1', 'user-6'],
    lastMessageId: 'msg-12',
    unreadCount: 0,
    updatedAt: '2025-11-14T21:10:00Z',
    title: 'Charlie',
  },
  {
    id: 'conv-5',
    participantIds: ['user-1', 'user-7'],
    lastMessageId: 'msg-15',
    unreadCount: 3,
    updatedAt: '2025-11-14T19:05:00Z',
    title: 'David',
  },
  {
    id: 'conv-6',
    participantIds: ['user-1', 'user-8', 'user-9'],
    lastMessageId: 'msg-18',
    unreadCount: 0,
    updatedAt: '2025-11-13T14:20:00Z',
    title: 'Marketing Team',
  },
  {
    id: 'conv-7',
    participantIds: ['user-1', 'user-10'],
    lastMessageId: 'msg-21',
    unreadCount: 5,
    updatedAt: '2025-11-12T09:50:00Z',
    title: 'Eve',
  },
]

export const useConversationsStore = defineStore('conversations', () => {
  const conversations = ref<Record<string, Conversation>>(
    mockConversations.reduce(
      (acc, conv) => {
        acc[conv.id] = conv
        return acc
      },
      {} as Record<string, Conversation>,
    ),
  )

  function addConversation(conv: Conversation) {
    conversations.value[conv.id] = conv
  }

  function updateLastMessage(conversationId: string, messageId: string) {
    if (conversations.value[conversationId]) {
      conversations.value[conversationId].lastMessageId = messageId
      conversations.value[conversationId].updatedAt = new Date().toISOString()
    }
  }

  const allConversations = computed(() =>
    Object.values(conversations.value).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    ),
  )

  return { conversations, addConversation, updateLastMessage, allConversations }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConversationsStore, import.meta.hot))
}
