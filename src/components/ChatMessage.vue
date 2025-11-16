<template>
  <div
    :class="[
      'p-2 mb-2 rounded-lg max-w-xs',
      isMine
        ? 'bg-primary-400 text-white ml-auto'
        : 'bg-surface-200 dark:bg-surface-700 text-content mr-auto',
    ]"
  >
    {{ message.text }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Message {
  id: string
  text: string
  userId: string
  createdAt: string
}

const props = defineProps<{
  message: Message
}>()

const isMine = props.message.userId === 'me'
</script>
