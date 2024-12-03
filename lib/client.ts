import axios, { AxiosError, AxiosRequestConfig } from "axios"

export const client = (() => {
  return axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Accept: "application/json, text/plain, */*",
    },
  })
})()

export const request = async (options: AxiosRequestConfig) => {
  try {
    const response = await client(options)
    const { data } = response

    return { data, ok: true} 
  } catch (e) {
    const error = e as AxiosError

    console.error(error);

    return {
      ok: false,
      data: error.response?.data,
    }
  }
}
