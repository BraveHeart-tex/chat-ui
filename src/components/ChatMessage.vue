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
import type { Message } from '@/stores/message'
import { defineProps } from 'vue'

const props = defineProps<{
  message: Message
}>()

const isMine = props.message.senderId === 'me'
</script>
