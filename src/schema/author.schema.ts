import z from 'zod'

// 작성자 정보
export const AuthorSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profile_image_url: z.url().nullable(),
  role: z.enum(['TA', 'LC', 'OM', 'ST', 'AD', 'U']).optional(),
})

export const TransformedAuthor = AuthorSchema.transform((data) => ({
  id: data.id,
  nickname: data.nickname,
  profileImageUrl: data.profile_image_url,
  role: data.role,
}))

export type Author = z.infer<typeof TransformedAuthor>
