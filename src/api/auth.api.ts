import { LOG_IN_URL } from '@/data'
import axios from 'axios'

const logIn = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const response = await axios.post(LOG_IN_URL, {
    email,
    password,
  })
  return response.data
}

export { logIn }
