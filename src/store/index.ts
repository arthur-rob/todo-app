import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface SnackbarConfig {
    display: boolean
    message: string
    type: 'info' | 'success' | 'error'
}

export const useIndexStore = defineStore('index', () => {
    const snackbarConfig = reactive<SnackbarConfig>({
        display: false,
        message: '',
        type: 'info',
    })

    return {
        snackbarConfig,
    }
})
