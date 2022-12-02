import axios from 'axios'

const baseURL = 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL: baseURL
})

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            if(config.headers) config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            if(config.headers) config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default axiosInstance