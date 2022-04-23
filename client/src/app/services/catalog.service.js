import httpService from './http.service'

const catalogEndpoint = 'catalogs/'

const catalogService = {
    get: async () => {
        const { data } = await httpService.get(catalogEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(
            catalogEndpoint,
            payload
        )
        return data
    },
    getCurrentCategory: async (payload) => {
        const { data } = await httpService.get(
            catalogEndpoint + payload._id
        )
        return data
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            catalogEndpoint + payload._id,
            payload
        )
        return data
    }
}
export default catalogService
