import axios from 'axios'

export const ngrokURL = 'http://021f5fcf.ngrok.io/'

export const axiosBase = axios.create({
    baseURL: `${ngrokURL}api/`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
    },
})
