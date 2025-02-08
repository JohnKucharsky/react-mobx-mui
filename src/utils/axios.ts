import axios from 'axios'

export const axiosInstance = axios.create({
  timeout: 15000,
  paramsSerializer: { indexes: null },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error instanceof Error) {
      console.error(error.message)
      return Promise.reject(error)
    }
  },
)
