import { defineStore } from 'pinia'
import { reactive } from 'vue'

type SnackbarType = 'info' | 'success' | 'error' | 'warning'
interface SnackbarConfig {
    display: boolean
    message: string
    type: SnackbarType
}

export const useIndexStore = defineStore('index', () => {
    const snackbarConfig = reactive<SnackbarConfig>({
        display: false,
        message: '',
        type: 'info',
    })

    const displaySnackBar = (
        message: string,
        type: SnackbarType = 'success'
    ): void => {
        snackbarConfig.message = message
        snackbarConfig.type = type
        snackbarConfig.display = true
    }
    return {
        snackbarConfig,
        displaySnackBar,
    }
})
