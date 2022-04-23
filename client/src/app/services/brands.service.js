import httpService from './http.service'

const brandsEndpoint = '/brands/'

const brandsService = {
    get: async () => {
        const { data } = await httpService.get(brandsEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            brandsEndpoint,
            payload
        )
        return data
    },
    getCurrentBrand: async (payload) => {
        const { data } = await httpService.get(
            brandsEndpoint + payload._id
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            brandsEndpoint + payload._id,
            payload
        )
        return data
    }
}
export default brandsService
