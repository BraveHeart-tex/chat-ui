<script setup lang="ts">
import { ref } from 'vue'
import ChatHeader from '@/components/ChatHeader.vue'
import ConversationsList from '@/components/ConversationsList.vue'
import ChatMessage from '@/components/ChatMessage.vue'
import MessageInput from '@/components/MessageInput.vue'
import type { Conversation } from '@/stores/conversation'
import { useMessagesStore } from '@/stores/message'

const selectedConversation = ref<Conversation | undefined>()
const messagesStore = useMessagesStore()
const messages = messagesStore.getMessagesByConversation(selectedConversation.value?.id ?? '')

function selectConversation(conv: Conversation) {
  selectedConversation.value = conv
}

function sendMessage() {}
</script>

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
      <ConversationsList @select="selectConversation" />
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
        <ChatMessage v-for="msg in messages ?? []" :key="msg.id" :message="msg" />
      </div>

      <!-- Message Input -->
      <MessageInput v-if="selectedConversation" @send="sendMessage" />
    </div>

    <!-- Mobile: Conversations overlay -->
    <div v-if="!selectedConversation" class="block md:hidden h-full">
      <ConversationsList @select="selectConversation" />
    </div>
  </div>
</template>
