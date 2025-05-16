<template>
    <v-layout>
        <v-navigation-drawer permanent width="200">
            <template #prepend>
                <div class="d-flex align-center justify-space-between pa-2">
                    <h4>My Tasks List</h4>
                </div>
                <v-divider></v-divider>
                <TaskList />
            </template>
        </v-navigation-drawer>
        <v-card class="dashboard elevation-0">
            <template #prepend>
                <h2>{{ selectedList || 'Tasks' }}</h2>
            </template>
            <template #append>
                <v-btn
                    color="primary"
                    append-icon="mdi-plus"
                    @click="createNewTask"
                >
                    Create New
                </v-btn>
            </template>
            <v-divider></v-divider>
            <div
                class="task-wrapper d-flex flex-wrap justify-space-between pa-2"
            >
                <TaskCard
                    v-for="task in taskStore.myTasks"
                    :key="task.id"
                    :task="task"
                    @click="setTaskToEdit(task)"
                >
                </TaskCard>
            </div>
        </v-card>
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
            <TaskForm v-if="isDrawerOpen" @close="isDrawerOpen = false" />
        </v-navigation-drawer>
    </v-layout>
</template>
<script setup lang="ts">
import TaskForm from '../components/TaskForm.vue'
import TaskCard from '../components/TaskCard.vue'
import TaskList from '../components/TaskList.vue'
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useTaskStore } from '../store/task'
import type { Task } from '../types/Task'

const isDrawerOpen = ref<boolean>(false)
const selectedList = ref<string>(null)
const taskStore = useTaskStore()
const authStore = useAuthStore()

const setTaskToEdit = (task: Task) => {
    taskStore.taskToEdit = { ...task }
    isDrawerOpen.value = true
}

const createNewTask = () => {
    taskStore.resetTaskToEdit()
    isDrawerOpen.value = true
}
authStore.syncProfile()
taskStore.getMyTasks()
</script>
<style scoped>
.dashboard {
    width: 100%;
    height: 100%;
    padding-left: 200px;
}
</style>
