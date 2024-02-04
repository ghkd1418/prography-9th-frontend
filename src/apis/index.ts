import Axios, { AxiosInstance } from 'axios'

export const createApi = (): AxiosInstance => {
  const customAxios = Axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1',
  })

  customAxios.interceptors.response.use(
    (response) => {
      return Promise.resolve(response)
    },

    async (error) => {
      return Promise.reject(error)
    }
  )

  return customAxios
}

const customAxios = createApi()

export default customAxios
