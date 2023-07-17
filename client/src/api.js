import axios from "axios"
const baseUrl = process.env.REACT_APP_BASE_ENDPOINT
export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(`${baseUrl}product?page=${pageParam}`)
  return data
}

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`${baseUrl}product/${id}`)
  return data
}

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`${baseUrl}auth/register`, input)
  return data
}
