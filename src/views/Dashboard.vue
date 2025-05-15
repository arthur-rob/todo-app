<template>
    <div class="dashboard-wrapper">
        <h2>Dashboard !</h2>
    </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
authStore.syncProfile()
</script>
