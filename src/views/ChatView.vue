<template>
  <div
    class="h-screen w-screen flex flex-col md:grid md:grid-cols-4 md:grid-rows-1 bg-surface-0 dark:bg-surface-900"
  >
    <!-- Header (mobile only) -->
    <ChatHeader class="md:hidden" />

    <!-- Left Panel: Conversations (desktop) -->
    <div
      class="hidden md:flex md:flex-col md:col-span-1 border-r border-surface-300 bg-surface-100 dark:bg-surface-800"
    >
      <ConversationsList :conversations="conversations" @select="selectConversation" />
    </div>

    <!-- Right Panel: Selected Chat -->
    <div class="col-span-4 md:col-span-3 flex flex-col bg-surface-0 dark:bg-surface-900">
      <!-- Chat Header (desktop) -->
      <ChatHeader
        v-if="selectedConversation"
        class="hidden md:flex"
        :conversation="selectedConversation"
      />

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4">
        <ChatMessage
          v-for="msg in selectedConversation?.messages ?? []"
          :key="msg.id"
          :message="msg"
        />
      </div>

      <!-- Message Input -->
      <MessageInput v-if="selectedConversation" @send="sendMessage" />
    </div>

    <!-- Mobile: Conversations overlay -->
    <div v-if="!selectedConversation" class="block md:hidden h-full">
      <ConversationsList :conversations="conversations" @select="selectConversation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ConversationsList from '@/components/ConversationsList.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import MessageInput from '@/components/MessageInput.vue'

interface Message {
  id: string
  text: string
  userId: string
  createdAt: string
}

interface Conversation {
  id: string
  name: string
  messages: Message[]
}

const conversations = ref<Conversation[]>([
  {
    id: '1',
    name: 'Alice',
    messages: [
      { id: 'm1', text: 'Hello!', userId: '1', createdAt: '2025-11-16T12:00:00Z' },
      { id: 'm2', text: 'Hi there!', userId: 'me', createdAt: '2025-11-16T12:01:00Z' },
    ],
  },
  {
    id: '2',
    name: 'Bob',
    messages: [{ id: 'm3', text: 'How are you?', userId: '2', createdAt: '2025-11-16T12:05:00Z' }],
  },
])

const selectedConversation = ref<Conversation | null>(conversations.value[0]!)

function selectConversation(conv: Conversation) {
  selectedConversation.value = conv
}

function sendMessage(msg: Message) {
  // placeholder for now
  if (selectedConversation.value) {
    selectedConversation.value.messages.push(msg)
  }
}
</script>
