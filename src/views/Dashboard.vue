<template>
    <v-layout>
        <h2>Dashboard !</h2>
        <v-navigation-drawer
            v-model="isDrawerOpen"
            :width="400"
            location="right"
        >
            <template #prepend>
                <div class="d-flex align-center justify-space-between pa-2">
                    <h2>Task</h2>
                    <v-btn
                        variant="tonal"
                        icon="mdi-close"
                        @click="isDrawerOpen = false"
                    />
                </div>
            </template>
            <v-divider></v-divider>
            <TaskForm @close="isDrawerOpen = false" />
        </v-navigation-drawer>
    </v-layout>
</template>
<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue'
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useTaskStore } from '../store/task'

const isDrawerOpen = ref<boolean>(true)

const taskStore = useTaskStore()
const authStore = useAuthStore()

authStore.syncProfile()
taskStore.getMyTasks()
</script>
