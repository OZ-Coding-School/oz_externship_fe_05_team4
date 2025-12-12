import axios from 'axios'

export const api = axios.create({
  baseURL: '/api', //UPL 나오면 업데이트 예정
  withCredentials: true,
})
export default api
