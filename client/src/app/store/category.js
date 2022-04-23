/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'
import categoryService from 'app/services/category.service'

const initialCategory = {
    ru: 'Need choose category',
    en: 'Need choose category',
    ro: 'Need choose category',
    id: null
}

const initialState = {
    entities: null,
    isLoaded: false,
    error: null,
    dataLoaded: false
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        categoryRequested: (state) => {
            state.isLoaded = true
        },
        categoryReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoaded = false
        },
        categoryCreated: (state, action) => {
            state.entities.push(action.payload)
            state.dataLoaded = true
            state.isLoaded = false
        },
        categoryUpdated: (state, action) => {
            const index = state.entities.findIndex(product => product._id === action.payload._id)
            state.entities.splice(index, 1, action.payload)
        },
        categoryRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoaded = false
        }
    }
})

const { reducer: categoryReducer, actions } = categorySlice
const {
    categoryRequested,
    categoryReceived,
    categoryCreated,
    categoryUpdated,
    categoryRequestFailed
} = actions

const categoryDeleteRequested = createAction('category/DeleteRequested')
const categoryCreateRequested = createAction('category/CreateRequested')

export const loadCategoryList = (payload) => async (dispatch) => {
    dispatch(categoryRequested())
    try {
        const { content } = await categoryService.get()
        dispatch(categoryReceived(content))
    } catch (error) {
        dispatch(categoryRequestFailed(error.message))
    }
}

export const createCategory = (payload) => async (dispatch) => {
    dispatch(categoryCreateRequested())
    try {
        const { content } = await categoryService.create(payload)
        dispatch(categoryCreated(content))
    } catch (error) {
        dispatch(categoryRequestFailed(error.message))
    }
}

export const updateCategory = (payload) => async dispatch => {
    try {
        const { content } = await categoryService.update(payload)
        dispatch(categoryUpdated(content))
    } catch (error) {
        dispatch(categoryRequestFailed(error.message))
    }
}

export const getCategoryLoadingStatus = () => state => state.category.dataLoaded
export const getCategoryList = () => state => state.category.entities
export const getCategoryByID = (id) => state => {
    return state.category?.entities
        ? state.category.entities.find(category => category._id === id)
        : initialCategory
}

export default categoryReducer
