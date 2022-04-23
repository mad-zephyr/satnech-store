/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'
import catalogService from 'app/services/catalog.service'

const initialCatalog = {
    ru: 'Need choose catalog',
    en: 'Need choose catalog',
    ro: 'Need choose catalog',
    id: null
}

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    dataLoaded: false
}

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        catalogRequested: (state) => {
            state.isLoading = true
        },
        catalogReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        catalogCreated: (state, action) => {
            state.entities.push(action.payload)
            state.dataLoaded = true
            state.isLoading = false
        },
        catalogUpdated: (state, action) => {
            const index = state.entities.findIndex(catalog => catalog._id === action.payload._id)
            state.entities.splice(index, 1, action.payload)
        },
        catalogRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: catalogReducer, actions } = catalogSlice
const {
    catalogRequested,
    catalogReceived,
    catalogCreated,
    catalogUpdated,
    catalogRequestFailed
} = actions

const catalogDeleteRequested = createAction('catalog/DeleteRequested')
const catalogCreateRequested = createAction('catalog/CreateRequested')

export const loadCatalogList = (payload) => async (dispatch) => {
    dispatch(catalogRequested())
    try {
        if (!payload) {
            const { content } = await catalogService.get()
            dispatch(catalogReceived(content))
        }
    } catch (error) {
        dispatch(catalogRequestFailed(error.message))
    }
}

export const createCatalog = (payload) => async (dispatch) => {
    dispatch(catalogCreateRequested())
    try {
        const { content } = await catalogService.create(payload)
        dispatch(catalogCreated(content))
    } catch (error) {
        dispatch(catalogRequestFailed(error.message))
    }
}

export const updateCatalog = (payload) => async dispatch => {
    try {
        const { content } = await catalogService.update(payload)
        dispatch(catalogUpdated(content))
    } catch (error) {
        dispatch(catalogRequestFailed(error.message))
    }
}

export const getIsLoading = () => (state) => state.catalog.isLoading
export const getCatalogLoadingStatus = () => state => state.catalog.dataLoaded
export const getCatalogsList = () => state => state.catalog.entities
export const getCatalogByID = (id) => state => {
    return id
        ? state.catalog.entities.find(catalog => catalog._id === id)
        : state.catalog.entities
        ? state.catalog.entities[0]
        : initialCatalog
}

export default catalogReducer
