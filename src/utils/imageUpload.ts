import axios from 'axios'

export const imageUpload = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}
