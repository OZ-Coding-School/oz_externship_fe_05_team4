import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.ozcodingschool.site',
  headers: {
    'Content-Type': 'application/json',
  },
})
