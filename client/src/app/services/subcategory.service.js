import httpService from './http.service'

const subcategoryEndpoint = '/subcategory'

const categoryService = {
    get: async () => {
        const { data } = await httpService.get(subcategoryEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            subcategoryEndpoint,
            payload
        )
        return data
    },
    getCurrentSubcategory: async (payload) => {
        const { data } = await httpService.get(
            subcategoryEndpoint + payload._id
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            subcategoryEndpoint + payload._id,
            payload
        )
        return data
    }
}
export default categoryService
