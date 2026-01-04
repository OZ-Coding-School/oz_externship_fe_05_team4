// src/utils/uploadMultipleImages.ts
import { uploadingImage } from '@/utils/uploadingImage'

export const uploadMultipleImages = async (
  files: File[]
): Promise<string[]> => {
  const imgUrls = await Promise.all(files.map((file) => uploadingImage(file)))
  return imgUrls
}
