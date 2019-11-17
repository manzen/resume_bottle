import axios from 'axios'

const ngrokURL = 'http://1ba79a1e.ngrok.io/'

export const axiosBase = axios.create({
    baseURL: `${ngrokURL}api/`,
})
