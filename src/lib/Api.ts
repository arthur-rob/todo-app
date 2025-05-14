import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class Api {
    axios: AxiosInstance;

    constructor() { 
        this.axios = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const token = sessionStorage.getItem('token');
        if (token) this.setToken(token);
    }
    setToken(token: string) {
        this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    get(url: string, config?: AxiosRequestConfig) {
        return this.axios.get(url, config);
    }
    post(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axios.post(url, data, config);
    }
    put(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axios.put(url, data, config);
    }
    delete(url: string, config?: AxiosRequestConfig) {
        return this.axios.delete(url, config);
    }
    patch(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.axios.patch(url, data, config);
    }
}

export default new Api();
