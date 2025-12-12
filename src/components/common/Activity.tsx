import type { UseQueryResult } from '@tanstack/react-query'

export interface ActivityProps<T> {
  query: UseQueryResult<T>
  loadingFallback?: React.ReactNode
  errorFallback?: React.ReactNode
  emptyFallback?: React.ReactNode
  children: React.ReactNode
}

export function Activity<T>({
  query,
  loadingFallback = <p>Loading...</p>,
  errorFallback = <p>Error...</p>,
  emptyFallback = <p>No Data</p>,
  children,
}: ActivityProps<T>) {
  if (query.isPending) return loadingFallback
  if (query.isError) return errorFallback

  const data = query.data

  if (Array.isArray(data) && data.length === 0) return emptyFallback
  if (data == null) return emptyFallback

  return children
}
