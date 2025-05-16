import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from '../lib/Api'
import type { List } from '../types/List'

export const useListStore = defineStore('list', () => {
    const taskLists = ref<List[]>([])

    const activeList = ref<List>()

    const getMyList = async (): Promise<List[] | undefined> => {
        try {
            const response = await Api.get('/list/me')
            taskLists.value = response.data
            return taskLists.value
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const createList = async (listName: string): Promise<List | undefined> => {
        try {
            const response = await Api.post('/list', { name: listName })
            taskLists.value.push(response.data)
            return response.data
        } catch (error) {
            console.error('Error creating list:', error)
            throw new Error('Error creating list')
        }
    }

    const deleteList = async (listId: number): Promise<void> => {
        try {
            await Api.delete(`/list/${listId}`)
            const listIndex = taskLists.value.findIndex((t) => t.id === listId)
            if (listIndex !== -1) {
                taskLists.value.splice(listIndex, 1)
            }
            return
        } catch (error) {
            console.error('Error deleting list:', error)
        }
    }

    const setSelectedList = (listId: number) => {
        activeList.value = taskLists.value.find((list) => list.id === listId)
        if (!activeList.value) {
            console.error('List not found')
        }
    }

    return {
        taskLists,
        getMyList,
        createList,
        activeList,
        setSelectedList,
        deleteList,
    }
})
