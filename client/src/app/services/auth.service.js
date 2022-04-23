import axios from 'axios'
import localStorageService from './localStorage.service'
import config from '../config.json'

const httpAuth = axios.create({
    // baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    baseURL: config.apiEndpoint + '/auth'
    // params: {
    //     key: process.env.REACT_APP_FIREBASE_KEY
    // }
})

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signUp`, {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(`signInWithPassword`, {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    refresh: async () => {
        const { data } = await httpAuth.post('token', {
            userId: localStorageService.getUserId(),
            refreshToken: localStorageService.getRefreshToken()
        })
        return data
    }
}

export default authService
