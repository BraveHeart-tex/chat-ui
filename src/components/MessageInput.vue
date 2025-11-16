<template>
  <div class="p-4 border-t border-surface-300 bg-surface-100 dark:bg-surface-800 flex">
    <input
      type="text"
      placeholder="Type a message"
      class="flex-1 p-2 rounded-l-lg border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 text-content focus:outline-none"
    />
    <Button label="Send" class="rounded-r-lg rounded-none" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
</script>
