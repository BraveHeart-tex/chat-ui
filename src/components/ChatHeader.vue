<template>
  <div
    :class="[
      'flex items-center gap-2 p-4 border-b border-surface-300 bg-surface-100 dark:bg-surface-800 shadow-1',
      props.class,
    ]"
  >
    <Button icon="pi pi-arrow-left" severity="secondary" />
    <div>{{ conversation?.title ?? 'Chats' }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Button from 'primevue/button'
import type { Conversation } from '@/stores/conversation'

const props = defineProps<{
  conversation?: Conversation
  class?: string
}>()
</script>
