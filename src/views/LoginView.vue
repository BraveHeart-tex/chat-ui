<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'

const username = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const userStore = useUserStore()

if (userStore.username && userStore.userId) {
  router.push('/chat')
}

async function handleSubmit() {
  error.value = ''

  if (!username.value.trim()) {
    error.value = 'Username is required.'
    return
  }

  // Mock login
  // TODO: Will replace this with actual API call
  loading.value = true
  userStore.setUser('1', username.value)
  router.push('/chat')
}
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <Card class="w-full max-w-md">
      <template #title>
        <h1 class="text-center">Login</h1>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <div>
            <label class="block mb-1 text-sm font-medium">Username</label>
            <InputText v-model="username" class="w-full" placeholder="Enter username" />
            <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
          </div>

          <Button type="submit" :loading="loading" label="Login" class="w-full !py-3" />
        </form>
      </template>
    </Card>
  </div>
</template>
