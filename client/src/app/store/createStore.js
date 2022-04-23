import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from './products'
import locationReducer from './location'
import userReducer from './user'
import adminReducer from './admin'
import catalogReducer from './catalog'
import categoryReducer from './category'
import brandsReducer from './brands'
import subcategoryReducer from './subcategory'

const rootReducer = combineReducers({
    products: productsReducer,
    location: locationReducer,
    user: userReducer,
    admin: adminReducer,
    category: categoryReducer,
    catalog: catalogReducer,
    brands: brandsReducer,
    subcategory: subcategoryReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
