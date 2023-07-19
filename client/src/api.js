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

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`${baseUrl}/auth/login`, input)
  return data
}

export const fetchMe = async (id) => {
  const { data } = await axios.get(`${baseUrl}/auth/me`)
  return data
}

export const fetchLogout = async () => {
  const { data } = await axios.post(`${baseUrl}/auth/logout`, {
    refresh_token: localStorage.getItem("refresh-token"),
  })
  return data
}

export const postOrder = async (input) => {
  const { data } = await axios.post(`${baseUrl}/order`, input)
  return data
}

export const fetchOrders = async () => {
  const { data } = await axios.get(`${baseUrl}/order`)
  await data.reverse()
  return data
}

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/product/${id}`)
  return data
}

export const updateProduct = async (input, id) => {
  const { data } = await axios.put(`${baseUrl}/product/${id}`, input)
  return data
}

export const postProduct = async (input) => {
  const { data } = await axios.post(`${baseUrl}/product/`, input)
  return data
}
