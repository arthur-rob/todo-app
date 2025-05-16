<template>
    <v-form ref="taskForm" class="px-2 py-4">
        <v-text-field
            v-model="taskToEdit.title"
            variant="outlined"
            density="compact"
            label="Title"
            counter
            :maxlength="100"
            :rules="[(v) => isStringValid(v) || 'Title is required']"
            required
        />
        <v-text-field
            v-model="taskToEdit.descriptionShort"
            variant="outlined"
            density="compact"
            label="Description"
            counter
            :maxlength="120"
            :rules="[(v) => isStringValid(v) || 'Description is required']"
            required
        />
        <v-textarea
            v-model="taskToEdit.descriptionLong"
            variant="outlined"
            density="compact"
            label="Long description"
        />
        <v-checkbox
            v-model="taskToEdit.isCompleted"
            label="Is completed"
            variant="outlined"
            density="compact"
            color="primary"
        />
        <v-date-input
            v-model="taskToEdit.expireAt"
            density="compact"
            variant="outlined"
            label="Date"
        />
    </v-form>

    <v-divider></v-divider>
    <div class="d-flex align-center justify-end pa-2">
        <v-btn class="ma-2" @click="resetTaskForm"> close </v-btn>
        <v-btn
            v-if="taskToEdit.id"
            class="ma-2"
            variant="tonal"
            color="error"
            @click="isDeleteModalOpen = true"
        >
            Delete
        </v-btn>
        <v-btn
            class="ma-2"
            color="primary"
            :loading="isLoading"
            @click="validForm"
        >
            {{ taskToEdit.id ? 'Update' : 'Create' }}
        </v-btn>
    </div>
    <v-dialog v-model="isDeleteModalOpen" max-width="500" title="Delete Task">
        <v-card>
            <v-card-text>
                <p>Are you sure you want to delete this task?</p>
                <p class="">{{ taskToEdit.title }}</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="isDeleteModalOpen = false">Cancel</v-btn>
                <v-btn
                    color="error"
                    variant="elevated"
                    :loading="isLoading"
                    @click="deleteTask(taskToEdit.id)"
                    >Delete</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { isStringValid } from '../lib/Validators'
import { useIndexStore } from '../store'
import { useTaskStore } from '../store/task'
import type { Task } from '../types/Task'
import type { VForm } from 'vuetify/components'

const taskStore = useTaskStore()
const taskToEdit = ref<Task>(taskStore.taskToEdit)
const taskForm = ref<VForm>()
const indexStore = useIndexStore()
const isDeleteModalOpen = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const emits = defineEmits<{
    (e: 'close'): void
}>()

const resetTaskForm = () => {
    taskStore.resetTaskToEdit()
    emits('close')
}
const validForm = async () => {
    const validation = await taskForm.value?.validate()
    if (!validation?.valid) return
    isLoading.value = true
    if (taskToEdit.value.id) updateTask()
    else createTask()
}

const createTask = async () => {
    try {
        await taskStore.createTask(taskToEdit.value)
        indexStore.displaySnackBar('Task created successfully')
        resetTaskForm()
    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            'An error occurred creating task, try again later'
        indexStore.displaySnackBar(errorMessage, 'error')
    } finally {
        isLoading.value = false
    }
}
const updateTask = async () => {
    try {
        await taskStore.updateTask(taskToEdit.value)
        indexStore.displaySnackBar('Task updated successfully')
        resetTaskForm()
    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            'An error occurred updating task, try again later'
        indexStore.displaySnackBar(errorMessage, 'error')
    } finally {
        isLoading.value = false
    }
}
const deleteTask = async (taskId: number) => {
    isLoading.value = true
    try {
        await taskStore.deleteTask(taskId)
        indexStore.displaySnackBar('Task Deleted successfully')
        isDeleteModalOpen.value = false
        resetTaskForm()
    } catch (error) {
        const errorMessage =
            error.response?.data?.message ||
            'An error occurred Deleting task, try again later'
        indexStore.displaySnackBar(errorMessage, 'error')
    } finally {
        isLoading.value = false
    }
}
</script>
