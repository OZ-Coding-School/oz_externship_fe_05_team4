export const stripHtmlTags = (content: string) => {
  if (!content) return ''

  // 1. <로 시작하고
  // 2. >가 아닌 문자가 반복되다가 ([^>]*)
  // 3. >를 만나거나 OR($) 문장이 끝나면 매칭
  return content.replace(/<[^>]*($|>)/g, '')
}
