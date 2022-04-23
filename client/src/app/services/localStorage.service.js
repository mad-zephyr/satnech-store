const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const PRODUCTS_IN_CART = 'cart'

export function setTokens({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(USERID_KEY, userId)
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY)
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY)
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY)
}

export function setProductsToCart(product) {
    let cart = JSON.parse(localStorage.getItem(PRODUCTS_IN_CART))

    if (!cart) {
        cart = []
    }

    const index = cart.findIndex(prod => prod.sku === product.sku)

    if (index >= 0) {
        cart[index].quantity += 1

        localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
        return
    }

    cart.push(product)
    localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
}

export function getProductsFromCart() {
    const cart = JSON.parse(localStorage.getItem(PRODUCTS_IN_CART))

    if (cart) {
        return cart
    }

    return []
}

export function increaseProductsInCart(sku) {
    const cart = JSON.parse(localStorage.getItem(PRODUCTS_IN_CART))

    const index = cart.findIndex(prod => prod.sku === sku)

    if (index >= 0) {
        if (cart[index].quantity > 0) {
            cart[index].quantity += 1
        }

        localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
        return
    }

    localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
}

export function decreaseProductsInCart(sku) {
    const cart = JSON.parse(localStorage.getItem(PRODUCTS_IN_CART))

    const index = cart.findIndex(prod => prod.sku === sku)

    if (index >= 0) {
        if (cart[index].quantity > 0) {
            cart[index].quantity -= 1
        }

        localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
        return
    }

    localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
}
export function removeProductFromCart(sku) {
    const cart = JSON.parse(localStorage.getItem(PRODUCTS_IN_CART))

    const index = cart.findIndex(prod => prod.sku === sku)
    cart.splice(index, 1)

    localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify(cart))
}

export function clearCart() {
    localStorage.setItem(PRODUCTS_IN_CART, JSON.stringify([]))
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
    setProductsToCart,
    decreaseProductsInCart,
    increaseProductsInCart,
    removeProductFromCart,
    getProductsFromCart,
    clearCart
}
export default localStorageService
