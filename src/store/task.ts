import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from '../lib/Api'
import type { Task } from '../types/Task.d.ts'
import { DEFAULT_TASK } from '../constants/task'

export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([])
    const taskToEdit = ref<Task>({ ...DEFAULT_TASK })

    const getMyTasks = async (): Promise<Task[] | undefined> => {
        try {
            const response = await Api.get('/task/me')
            tasks.value = response.data
            return tasks.value
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const getTasksByList = async (id: number): Promise<Task[] | undefined> => {
        try {
            const response = await Api.get(`/task/list/${id}`)
            tasks.value = response.data
            return tasks.value
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const createTask = async (task: Task): Promise<Task | undefined> => {
        try {
            const response = await Api.post('/task', task)
            tasks.value.push(response.data)
            return response.data
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }
    const updateTask = async (task: Task): Promise<Task | undefined> => {
        try {
            const response = await Api.patch(`/task/${task.id}`, task)
            const taskIndex = tasks.value.findIndex((t) => t.id === task.id)
            if (taskIndex !== -1) {
                tasks.value[taskIndex] = response.data
            }
            return response.data
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }
    const deleteTask = async (taskId: number): Promise<Task | undefined> => {
        try {
            await Api.delete(`/task/${taskId}`)
            const taskIndex = tasks.value.findIndex((t) => t.id === taskId)
            if (taskIndex !== -1) {
                tasks.value.splice(taskIndex, 1)
            }
            return
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }

    const resetTaskToEdit = () => {
        taskToEdit.value = { ...DEFAULT_TASK }
    }
    return {
        tasks,
        getMyTasks,
        createTask,
        updateTask,
        taskToEdit,
        deleteTask,
        resetTaskToEdit,
        getTasksByList,
    }
})
