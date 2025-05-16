import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from '../lib/Api'
import type { Task } from '../types/Task.d.ts'
import { DEFAULT_TASK } from '../constants/task'

export const useTaskStore = defineStore('task', () => {
    const myTasks = ref<Task[]>([])
    const taskToEdit = ref<Task>({ ...DEFAULT_TASK })

    const getMyTasks = async (): Promise<Task[] | undefined> => {
        try {
            const response = await Api.get('/task/me')
            myTasks.value = response.data
            return []
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }
    const createTask = async (task: Task): Promise<Task | undefined> => {
        try {
            const response = await Api.post('/task', task)
            myTasks.value.push(response.data)
            return response.data
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }
    const updateTask = async (task: Task): Promise<Task | undefined> => {
        try {
            const response = await Api.patch(`/task/${task.id}`, task)
            const taskIndex = myTasks.value.findIndex((t) => t.id === task.id)
            if (taskIndex !== -1) {
                myTasks.value[taskIndex] = response.data
            }
            return response.data
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }
    const deleteTask = async (taskId: number): Promise<Task | undefined> => {
        try {
            await Api.delete(`/task/${taskId}`)
            const taskIndex = myTasks.value.findIndex((t) => t.id === taskId)
            if (taskIndex !== -1) {
                myTasks.value.splice(taskIndex, 1)
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
        myTasks,
        getMyTasks,
        createTask,
        updateTask,
        taskToEdit,
        deleteTask,
        resetTaskToEdit,
    }
})
