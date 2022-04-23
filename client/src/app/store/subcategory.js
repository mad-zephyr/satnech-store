/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'
import subcategoryService from 'app/services/subcategory.service'

const initialSubcategory = {
    ru: 'Need choose category',
    en: 'Need choose category',
    ro: 'Need choose category',
    id: null
}

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false
}

const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {
        subcategoryRequested: (state) => {
            state.isLoading = true
        },
        subcategoryReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        subcategoryCreated: (state, action) => {
            state.entities.push(action.payload)
            state.dataLoaded = true
            state.isLoading = false
        },
        subcategoryUpdated: (state, action) => {
            const index = state.entities.findIndex(subcategory => subcategory._id === action.payload._id)
            state.entities.splice(index, 1, action.payload)
        },
        subcategoryRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: subcategoryReducer, actions } = subcategorySlice
const {
    subcategoryRequested,
    subcategoryReceived,
    subcategoryCreated,
    subcategoryUpdated,
    subcategoryRequestFailed
} = actions

const subcategoryDeleteRequested = createAction('category/DeleteRequested')
const subcategoryCreateRequested = createAction('category/CreateRequested')

export const loadSubcategoryList = (payload) => async (dispatch) => {
    dispatch(subcategoryRequested())
    try {
        const { content } = await subcategoryService.get()
        dispatch(subcategoryReceived(content))
    } catch (error) {
        dispatch(subcategoryRequestFailed(error.message))
    }
}

export const createSubcategory = (payload) => async (dispatch) => {
    dispatch(subcategoryCreateRequested())
    try {
        const { content } = await subcategoryService.create(payload)
        dispatch(subcategoryCreated(content))
    } catch (error) {
        dispatch(subcategoryRequestFailed(error.message))
    }
}

export const updateCategory = (payload) => async dispatch => {
    try {
        const { content } = await subcategoryService.update(payload)
        dispatch(subcategoryUpdated(content))
    } catch (error) {
        dispatch(subcategoryRequestFailed(error.message))
    }
}

export const getIsLoggedIn = () => (state) => state.subcategory?.isLoggedIn
export const getSubcategoriesLoadingStatus = () => state => state.subcategory?.dataLoaded
export const getSubategoryList = () => state => state.subcategory?.entities
export const getSubcategoryByID = (id) => state => {
    return state?.subcategory?.entities
        ? state?.subcategory?.entities.find(subcategory => subcategory?._id === id)
        : initialSubcategory
}

export default subcategoryReducer
