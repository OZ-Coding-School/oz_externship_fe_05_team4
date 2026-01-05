import { CATEGORY_DATA } from '@/constants'

export const findNamesBySubId = (
  subId: number
): { mainName: string; middleName: string; subName: string } | null => {
  for (const main of CATEGORY_DATA) {
    for (const middle of main.subCategories) {
      const hit = middle.items.find((item) => item.id === subId)
      if (hit)
        return {
          mainName: main.name,
          middleName: middle.name,
          subName: hit.name,
        }
    }
  }
  return null
}

export const findSubIdByNames = (
  mainName: string,
  middleName: string,
  subName: string
): number | null => {
  const main = CATEGORY_DATA.find((c) => c.name === mainName)
  const middle = main?.subCategories.find((m) => m.name === middleName)
  const sub = middle?.items.find((s) => s.name === subName)
  return sub?.id ?? null
}
