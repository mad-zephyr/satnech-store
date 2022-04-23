/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'
import brandsService from 'app/services/brands.service'

const initialBrand = {
    ru: 'Need choose category',
    en: 'Need choose category',
    ro: 'Need choose category',
    id: null
}

const initialState = {
    entities: [initialBrand],
    isLoading: false,
    error: null,
    dataLoaded: false
}

const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        brandsRequested: (state) => {
            state.isLoading = true
        },
        brandsReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        brandsCreated: (state, action) => {
            state.entities.push(action.payload)
            state.dataLoaded = true
            state.isLoading = false
        },
        brandsUpdated: (state, action) => {
            const index = state.entities.findIndex(brand => brand._id === action.payload._id)
            state.entities.splice(index, 1, action.payload)
        },
        brandsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: brandsReducer, actions } = brandsSlice
const {
    brandsRequested,
    brandsReceived,
    brandsCreated,
    brandsUpdated,
    brandsRequestFailed
} = actions

const brandsDeleteRequested = createAction('brands/DeleteRequested')
const brandsCreateRequested = createAction('brands/CreateRequested')

export const loadBrandsList = () => async (dispatch) => {
    dispatch(brandsRequested())
    try {
        const { content } = await brandsService.get()
        dispatch(brandsReceived(content))
    } catch (error) {
        dispatch(brandsRequestFailed(error.message))
    }
}

export const createBrand = (payload) => async (dispatch) => {
    dispatch(brandsCreateRequested())
    try {
        const { content } = await brandsService.create(payload)
        dispatch(brandsCreated(content))
    } catch (error) {
        dispatch(brandsRequestFailed(error.message))
    }
}

export const updateBrand = (payload) => async dispatch => {
    try {
        const { content } = await brandsService.update(payload)
        dispatch(brandsUpdated(content))
    } catch (error) {
        dispatch(brandsRequestFailed(error.message))
    }
}

export const getIsLoggedIn = () => (state) => state.brands.isLoggedIn
export const getBrandsLoadingStatus = () => state => state.brands.dataLoaded
export const getBrands = () => state => state.brands.entities
export const getBrandByID = (id) => state => {
    return state.brands?.entities
        ? state.brands.entities.find(brands => brands._id === id)
        : initialBrand
}

export default brandsReducer
