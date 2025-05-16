<template>
    <v-layout>
        <v-navigation-drawer permanent width="200">
            <div
                class="d-flex align-center justify-space-between pa-2 list-header"
            >
                <h3>{{ authStore.user?.firstName }} Task List</h3>
            </div>
            <v-divider></v-divider>
            <TaskList />
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
                    :disabled="!listStore.activeList"
                >
                    Create New
                </v-btn>
            </template>
            <v-divider></v-divider>
            <div class="task-wrapper d-flex flex-wrap pa-2">
                <TaskCard
                    v-for="task in taskStore.tasks"
                    :key="task.id"
                    :task="task"
                    @click="setTaskToEdit(task)"
                >
                </TaskCard>
            </div>

            <div
                class="rounded bg-blue-grey-lighten-5 d-flex flex-wrap pa-2 ma-4"
                v-if="!listStore.activeList"
            >
                <v-icon
                    icon="mdi-alert-box"
                    color="warning"
                    class="mr-2"
                ></v-icon>
                <p class="text-subtitle-1">
                    To create or edit task, please select or create a list.
                </p>
            </div>
            <div
                class="d-flex flex-wrap pa-2 ma-4"
                v-else-if="taskStore.tasks.length == 0"
            >
                <v-btn
                    variant="tonal"
                    color="primary"
                    @click="createNewTask"
                    append-icon="mdi-arrow-right"
                >
                    Create My First Task</v-btn
                >
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
import { useListStore } from '../store/list'

const isDrawerOpen = ref<boolean>(false)
const selectedList = ref<string>(null)
const taskStore = useTaskStore()
const authStore = useAuthStore()
const listStore = useListStore()
const setTaskToEdit = (task: Task) => {
    taskStore.taskToEdit = { ...task }
    isDrawerOpen.value = true
}

const createNewTask = () => {
    taskStore.resetTaskToEdit()
    isDrawerOpen.value = true
}
authStore.syncProfile()
listStore.getMyList()
</script>
<style scoped>
.dashboard {
    width: 100%;
    height: 100%;
    padding-left: 200px;
}
.list-header {
    height: 56px;
}
</style>
