import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

export function useTestQuery() {
  return useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      const res = await api.get('/hello')
      return res.data
    },
  })
}
