import { createAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import history from '../utils/history'
import generateAuthError from '../utils/generateAuthErrors'

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
      }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
      }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true
        },
        userReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload
            state.isLoggedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        userUpdatedData: (state, action) => {
            state.entities.map(user => (user.id === action.payload._id ? { ...action.payload } : user))
            state.isLoading = false
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        authRequested: (state) => {
            state.error = null
        }
    }
})

const { reducer: userReducer, actions } = userSlice
const {
    userRequested,
    userReceived,
    userRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdatedData
} = actions

const authRequested = createAction('user/authRequested')
const userCreateRequested = createAction('user/userCreateRequested')
const createUserFailed = createAction('user/createUserFailed')

export const login =
    (payload) =>
    async (dispatch) => {
        const { email, password } = payload
        dispatch(authRequested())
        try {
            const data = await authService.login({ email, password })
            dispatch(authRequestSuccess({ userId: data.localId }))
            localStorageService.setTokens(data)
            // history.push('/user')
        } catch (error) {
            const { code, message } = error.response.data.error
            if (code === 400) {
                const errorMessage = generateAuthError(message)
                dispatch(authRequestFailed(errorMessage))
            } else {
                dispatch(authRequestFailed(error.message))
            }
        }
    }

export const signUp =
    (payload) =>
    async (dispatch) => {
        dispatch(authRequested())
        try {
            const data = await authService.register(payload)
            localStorageService.setTokens(data)
            dispatch(authRequestSuccess({ userId: data.userId }))
            dispatch(
                createUser({
                    id: data.localId,
                    email: payload.email
                })
            )
        } catch (error) {
            dispatch(authRequestFailed(error.message))
        }
    }

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
}
function createUser(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested())
        try {
            const { content } = await userService.create(payload)
            dispatch(userCreated(content))
            history.push('/user/profile')
        } catch (error) {
            dispatch(createUserFailed(error.message))
        }
    }
}

export const updateUserData = (payload) => async (dispatch) => {
    dispatch(userRequested())
    try {
        const { content } = await userService.update(payload)
        dispatch(userUpdatedData(content))
    } catch (error) {
        dispatch(userRequestFailed(error.message))
    }
}

export const loadUserData = () => async (dispatch, getState) => {
    dispatch(userRequested())
    try {
        const { content } = await userService.getCurrentUser()
        dispatch(userReceived(content))
    } catch (error) {
        dispatch(userRequestFailed(error.message))
    }
}

export const getUserList = () => (state) => state.user.entities
export const getCurrentUserData = () => (state) => {
    return state.user.entities
        ? state.user.entities.find((u) => u._id === state.user.auth.userId)
        : null
}
export const getUserById = (userId) => (state) => {
    if (state.user.entities) {
        return state.user.entities.find((u) => u._id === userId)
    }
}

export const getIsLoggedIn = () => (state) => state.user.isLoggedIn
export const getDataStatus = () => (state) => state.user.dataLoaded
export const getUserLoadingStatus = () => (state) => state.user.isLoading
export const getCurrentUserId = () => (state) => state.user.auth?.userId
export const getCurrentUser = () => (state) => state.user?.entities
export const getAuthErrors = () => state => state.user.error

export default userReducer
