import httpService from './http.service'
const countryEndpoint = 'country/'

const countryService = {
    fetchAll: async () => {
        const { data } = await httpService.get(countryEndpoint)
        return data
    }
}
export default countryService
