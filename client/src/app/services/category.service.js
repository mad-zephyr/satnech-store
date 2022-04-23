import httpService from './http.service'

const categoryEndpoint = '/category/'

const categoryService = {
    get: async () => {
        const { data } = await httpService.get(categoryEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            categoryEndpoint,
            payload
        )
        return data
    },
    getCurrentCategory: async (payload) => {
        const { data } = await httpService.get(
            categoryEndpoint + payload._id
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            categoryEndpoint + payload._id,
            payload
        )
        return data
    }
}
export default categoryService
