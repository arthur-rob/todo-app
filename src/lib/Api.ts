import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class Api {
    axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const token = sessionStorage.getItem('token')
        if (token) this.setToken(token)
    }
    setToken(token: string) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    async get(url: string, config?: AxiosRequestConfig) {
        return await this.axios.get(url, config)
    }
    async post(
        url: string,
        data?: Record<string, object | string | number>,
        config?: AxiosRequestConfig
    ) {
        return await this.axios.post(url, data, config)
    }
    async delete(url: string, config?: AxiosRequestConfig) {
        return await this.axios.delete(url, config)
    }
    async patch(
        url: string,
        data?: Record<string, object | string | number>,
        config?: AxiosRequestConfig
    ) {
        return await this.axios.patch(url, data, config)
    }
}

export default new Api()
