<template>
    <v-card class="ma-1 py-2 px-4" max-width="400">
        <h3>Title: {{ task.title }}</h3>
        <p class="italic">Desc: {{ task.descriptionShort }}</p>
        <p>
            Completed:
            <v-icon
                :icon="task.isCompleted ? 'mdi-check' : 'mdi-close'"
                :color="task.isCompleted ? 'green' : 'red'"
            >
            </v-icon>
        </p>
        <p>Expire At: {{ formatedDate }}</p>
    </v-card>
</template>
<script setup lang="ts">
import type { Task } from '../types/Task'
import { computed } from 'vue'
const props = defineProps<{
    task: Task
}>()

const formatedDate = computed(() => {
    if (!props.task.expireAt) return 'not set'
    const date = new Date(props.task.expireAt)
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
})
</script>
