import { ImagePresignedUrlApi } from '@/api/image.api'
import { imageUpload } from '@/utils'

export const uploadingImage = async (file: File): Promise<string> => {
  const fileName = file.name

  const { presignedUrl, imgUrl } = await ImagePresignedUrlApi({
    fileName,
  })

  await imageUpload(presignedUrl, file)
  return imgUrl
}
