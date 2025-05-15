<template>
    <RouterView />
    <v-snackbar
        v-model="indexStore.snackbarConfig.display"
        variant="tonal"
        :color="snackbarColor"
    >
        {{ indexStore.snackbarConfig.message }}
    </v-snackbar>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useIndexStore } from './store'
const indexStore = useIndexStore()

const snackbarColor = computed(() => {
    return indexStore.snackbarConfig.type === 'error' ? 'red' : 'green'
})
</script>
