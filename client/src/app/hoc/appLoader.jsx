import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsLoadingStatus, loadProductsList, loadProductsFromStorage } from '../store/products'
import localStorageService from '../services/localStorage.service'
// import { loadUserData } from 'app/store/user'
import { loadCatalogList } from 'app/store/catalog'
import { loadCategoryList } from 'app/store/category'
import { getBrandsLoadingStatus, loadBrandsList } from 'app/store/brands'
import { getSubcategoriesLoadingStatus, loadSubcategoryList } from 'app/store/subcategory'

const AppLoader = ({ children }) => {
    const dispatch = useDispatch()
    // dispatch(loadUserData())
    dispatch(loadCatalogList())
    dispatch(loadCategoryList())
    dispatch(loadSubcategoryList())
    dispatch(loadBrandsList())
    // const isLoggedIn = useSelector(getIsLoggedIn())
    const productsStatusLoading = useSelector(getProductsLoadingStatus())
    const categoryLoadingStatus = useSelector(getProductsLoadingStatus())
    const subcategoryLoadingStatus = useSelector(getSubcategoriesLoadingStatus())
    const brandsLoadingStatus = useSelector(getBrandsLoadingStatus())

    useEffect(() => {
        if (!productsStatusLoading) dispatch(loadProductsList())
        const cartProducts = localStorageService.getProductsFromCart()
        dispatch(loadProductsFromStorage(cartProducts))
    }, [])

    if (!productsStatusLoading && !categoryLoadingStatus && !brandsLoadingStatus && !subcategoryLoadingStatus) return 'Loading...'
    return children
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AppLoader
