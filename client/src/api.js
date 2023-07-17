import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_ENDPOINT

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url)

    const allowedOrigins = [baseUrl]
    const token = localStorage.getItem("access-token")

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`${baseUrl}/product?page=${pageParam}`)
  return data
}

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`${baseUrl}/product/${id}`)
  return data
}

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`${baseUrl}/auth/register`, input)
  return data
}

export const fetchMe = async (id) => {
  const { data } = await axios.get(`${baseUrl}/auth/me`)
  return data
}
