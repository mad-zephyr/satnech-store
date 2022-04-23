/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'
import productService from '../services/products.service'

const initialState = {
    entities: null,
    currentProduct: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    error: null,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true
        },
        productReceived: (state, action) => {
            state.currentProduct = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        productRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        currentProductCleared: (state) => {
            state.currentProduct = null
        }
    }
})

const { reducer: adminReducer, actions } = adminSlice
const {
    productsRequested,
    productReceived,
    productRequestFailed,
    currentProductCleared
} = actions

export const setCurrentProduct = (payload) => async (dispatch) => {
    dispatch(productsRequested())
    try {
        dispatch(productReceived(payload))
    } catch (error) {
        dispatch(productRequestFailed(error.message))
    }
}

export const clearCurrentProduct = () => async (dispatch) => {
    try {
        dispatch(currentProductCleared())
    } catch (error) {
        dispatch(productRequestFailed(error.message))
    }
}

export const getIsLoggedIn = () => state => state.admin.isLoggedIn
export const getProductsLoadingStatus = () => state => state.admin.dataLoaded
export const getCurrentProduct = () => state => state.admin.currentProduct

export default adminReducer
