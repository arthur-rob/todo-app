import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import Api from '../lib/Api'
import type { Task } from '../types/Task.d.ts'
import { DEFAULT_TASK } from '../constants/task'

export const useTaskStore = defineStore('task', () => {
    const myTasks = reactive<Task[]>([])
    const taskToEdit = ref<Task>({ ...DEFAULT_TASK })

    const getMyTasks = async (): Promise<Task[] | undefined> => {
        try {
            const response = await Api.get('/task/me')
            myTasks.splice(0, myTasks.length, ...response.data)
            return []
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }
    const createTask = async (task: Task): Promise<Task | undefined> => {
        try {
            const response = await Api.post('/task', task)
            myTasks.push(response.data)
            return response.data
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }
    const updateTask = async (task: Task): Promise<Task | undefined> => {
        try {
            const response = await Api.patch(`/task/${task.id}`, task)
            const taskIndex = myTasks.findIndex((t) => t.id === task.id)
            if (taskIndex !== -1) {
                myTasks[taskIndex] = response.data
            }
            return response.data
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
        resetTaskToEdit,
    }
})
