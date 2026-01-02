export interface PresignRequest {
  fileName: string
}

export interface PresignResponse {
  presignedUrl: string
  imgUrl: string
  key: string
}

export interface UploadImageResult {
  imgUrl: string
  key: string
}
