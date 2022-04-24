/* eslint-disable no-unused-vars */
import { createAction, createSlice } from '@reduxjs/toolkit'
import productService from '../services/products.service'
import localStorageService from '../services/localStorage.service'
import { techData } from 'app/api/data'

const initialProduct = {
    actualPrice: '',
    brand: '',
    catalog: '',
    category: '',
    subcategory: '',
    type: '',
    images: null,
    isShow: true,
    oldPrice: 0,
    quantity: 0,
    sku: '',
    ru: {
        title: 'Название нового товара',
        description: 'Описание нового товара',
        text: 'Текст для нового товара'
    },
    en: {
        title: 'English name of product',
        description: 'English Описание нового товара',
        text: 'English Текст для нового товара'
    },
    ro: {
        title: 'Romanian Name Product',
        description: 'Romanian Описание нового товара',
        text: 'Romanian Текст для нового товара'
    }
}

const initialState = {
    entities: null,
    cart: null,
    currentProduct: null,
    isLoading: false,
    error: null,
    dataLoaded: false
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true
        },
        productsReceived: (state, action) => {
            state.entities = action.payload
            state.dataLoaded = true
            state.isLoading = false
        },
        productCreated: (state, action) => {
            state.entities.push(action.payload)
            state.dataLoaded = true
            state.isLoading = false
        },

        productUpdated: (state, action) => {
            const index = state.entities.findIndex(product => product._id === action.payload._id)
            state.entities.splice(index, 1, action.payload)
        },
        productsAddedFromStorage: (state, action) => {
            state.cart = action.payload
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        productAddedToCart: (state, action) => {
            if (!Array.isArray(state.cart)) {
                state.cart = []
            }
            const index = state.cart.findIndex(prod => prod._id === action.payload._id)

            index >= 0
                ? state.cart[index].quantity += 1
                : state.cart.push(action.payload)
        },
        increase: (state, action) => {
            const index = state.cart.findIndex(prod => prod._id === action.payload)
            state.cart[index].quantity += 1
        },
        dicrease: (state, action) => {
            const index = state.cart.findIndex(prod => prod._id === action.payload)
            state.cart[index].quantity > 1 && (state.cart[index].quantity -= 1)
        },
        productDeletedFromCart: (state, action) => {
            const index = state.cart.findIndex(prod => prod._id === action.payload)
            state.cart.splice(index, 1)
        },
        addedCurrentProduct: (state, action) => {
            state.currentProduct = action.payload
        },
        allDeletedFromCart: (state) => {
            state.cart = []
        },
        productDeleted: (state, action) => {
            const index = state.cart.findIndex(prod => prod._id === action.payload)
            state.cart.splice(index, 1)
        }
    }
})

const { reducer: productsReducer, actions } = productsSlice
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    productAddedToCart,
    increase,
    dicrease,
    productDeletedFromCart,
    allDeletedFromCart,
    productsAddedFromStorage,
    addedCurrentProduct,
    productUpdated,
    productCreated
} = actions

const productAddRequested = createAction('products/productAddRequested')
const productDeleteRequested = createAction('products/DeleteRequested')
const productCreateRequested = createAction('products/CreateRequested')

export const loadProductsList = (payload) => async (dispatch) => {
    dispatch(productsRequested())
    try {
        if (!payload) {
            const { content } = await productService.get()
            const techProduct = techData.product
            dispatch(productsReceived(content || techProduct))
        } else {
            dispatch(productsReceived(payload))
        }
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}
export const addProductToCart = (payload) => (dispatch) => {
    dispatch(productAddRequested())
    try {
        dispatch(productAddedToCart(payload))
        localStorageService.setProductsToCart((payload))
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}

export const createProduct = (payload) => async (dispatch) => {
    dispatch(productCreateRequested())
    try {
        const { content } = await productService.create(payload)
        dispatch(productCreated(content))
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}
export const deleteProduct = (payload) => async (dispatch) => {
    dispatch(productDeleteRequested())
    try {
        const { content } = await productService.deleteProduct(payload)
        dispatch(loadProductsList())
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}

export const updateProduct = (payload) => async dispatch => {
    try {
        const { content } = await productService.update(payload)
        dispatch(productUpdated(content))
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}
export const increaseProductInCart = (payload) => (dispatch) => {
    try {
        dispatch(increase(payload))
        localStorageService.increaseProductsInCart(payload)
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}
export const dicreaseProductInCart = (payload) => (dispatch) => {
    try {
        dispatch(dicrease(payload))
        localStorageService.decreaseProductsInCart(payload)
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}
export const deleteProductFromCart = (payload) => (dispatch) => {
    dispatch(productDeleteRequested())
    try {
        dispatch(productDeletedFromCart(payload))
        localStorageService.removeProductFromCart(payload)
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}
export const deleteAllFromCart = () => dispatch => {
    try {
        dispatch(allDeletedFromCart())
        localStorageService.clearCart()
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}

export const loadProductsFromStorage = (payload) => dispatch => {
    try {
        dispatch(productsAddedFromStorage(payload))
    } catch (error) {
        dispatch(productsRequestFailed(error.message))
    }
}

export const getIsLoggedIn = () => (state) => state.products.isLoggedIn
export const getProductsLoadingStatus = () => state => state.products.dataLoaded
export const getProducts = () => state => state.products.entities
export const getCartProducts = () => state => state.products.cart
export const getIsProductExist = (id) => state => {
    return state.products.entities.find(prod => prod._id === id)
}
export const getCartProductsID = (id) => state => {
    return state.products.entities?.find(prod => prod._id === id) || { ...initialProduct }
}

export default productsReducer
