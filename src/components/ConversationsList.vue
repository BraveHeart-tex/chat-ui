<template>
  <div class="flex flex-col h-full">
    <div
      v-for="conv in conversations"
      :key="conv.id"
      class="p-4 border-b border-surface-200 dark:border-surface-700 cursor-pointer hover:bg-surface-200 dark:hover:bg-surface-700"
      @click="$emit('select', conv)"
    >
      {{ conv.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Conversation {
  id: string
  name: string
  messages?: unknown[]
}

const props = defineProps<{
  conversations: Conversation[]
}>()
</script>
