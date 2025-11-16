<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
user.hydrate()
</script>

<template></template>
