import type { PresignRequest, PresignResponse } from '@/types/image'
import { api } from '@/lib'

export const ImagePresignedUrlApi = async (
  payload: PresignRequest
): Promise<PresignResponse> => {
  const res = await api.post('/qna/questions/presigned-url/', {
    file_name: payload.fileName,
  })

  return {
    presignedUrl: res.data.presigned_url,
    imgUrl: res.data.img_url,
    key: res.data.key,
  }
}
