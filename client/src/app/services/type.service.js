import httpService from './http.service'

const typeEndpoint = 'type/'

const typeService = {
    get: async () => {
        const { data } = await httpService.get(typeEndpoint)
        return data
    }
}
export default typeService
