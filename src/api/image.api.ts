import type { PresignRequest, PresignResponse } from '@/types/image'
import { api, token } from '@/lib'

export const ImagePresignedUrlApi = async (
  payload: PresignRequest
): Promise<PresignResponse> => {
  const res = await api.put(
    '/api/v1/questions/presigned-url',
    {
      file_name: payload.fileName,
    },
    {
      headers: {
        Authorization: `Bearer ${token.get()}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return {
    presignedUrl: res.data.presigned_url,
    imgUrl: res.data.img_url,
    key: res.data.key,
  }
}
