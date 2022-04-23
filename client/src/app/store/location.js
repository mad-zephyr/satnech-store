/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    path: '/',
    error: null
}

const productsSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        locationRequested: (state, action) => {
            state.path = action.payload
        },
        locationRequestedFiled: (state, action) => {
            state.error = action.payload
        }
    }
})

const { reducer: locationReducer, actions } = productsSlice
const {
    locationRequested,
    locationRequestedFiled
} = actions

const locationRequestInitialised = createAction('products/productAddRequested')

export const setLocation = (payload) => async (dispatch) => {
    locationRequestInitialised()
    try {
        dispatch(locationRequested(payload))
    } catch (error) {
        dispatch(locationRequestedFiled(payload))
    }
}
export const getLocation = () => state => state.location.path

export default locationReducer
