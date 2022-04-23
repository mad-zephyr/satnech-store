import httpService from './http.service'
import localStorageService from './localStorage.service'

const productsEndpoint = '/products/'

const productsService = {
    get: async () => {
        const { data } = await httpService.get(productsEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            productsEndpoint,
            payload
        )
        return data
    },
    getCurrentproducts: async () => {
        const { data } = await httpService.get(
            productsEndpoint + localStorageService.getUserId()
        )
        return data
    },
    deleteProduct: async (payload) => {
        const { data } = await httpService.delete(
            productsEndpoint + payload
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            productsEndpoint + payload._id,
            payload
        )
        return data
    }
}
export default productsService
