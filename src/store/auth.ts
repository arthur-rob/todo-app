import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from '../lib/Api'
import type { BaseUser, User } from '../types/User.d.ts'
import type { AxiosError } from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref<boolean>(false)
    const token = ref<string | null>()
    const user = ref<BaseUser>()

    const initialize = () => {
        token.value = localStorage.getItem('token')
        if (!token.value) return
        Api.setToken(token.value)
        isLoggedIn.value = true
    }

    const syncProfile = async (): Promise<User | undefined> => {
        try {
            const response = await Api.get('/auth/profile')
            user.value = response.data
            return user.value
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                localStorage.removeItem('token')
                isLoggedIn.value = false
            }
            //Router not available in this context
            window.location.href = '/'
            return undefined
        }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await Api.post('/auth/login', { email, password })
            token.value = response.data.access_token as string
            localStorage.setItem('token', token.value)
            Api.setToken(token.value)
            isLoggedIn.value = true
            return true
        } catch (error) {
            console.error('Login error:', error)
            return false
        }
    }

    return {
        isLoggedIn,
        user,
        initialize,
        syncProfile,
        login,
    }
})
