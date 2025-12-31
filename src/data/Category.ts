export interface CategoryItem {
  id: number
  name: string
}

export interface SubCategory {
  id: number
  name: string
  items: CategoryItem[]
}

export interface Category {
  id: number
  name: string
  subCategories: SubCategory[]
}

export type CategoryData = Category[]

export const CATEGORY_DATA: CategoryData = [
  {
    id: 4,
    name: '프론트엔드',
    subCategories: [
      {
        id: 5,
        name: '프로그래밍 언어',
        items: [
          { id: 6, name: 'JavaScript' },
          { id: 16, name: 'TypeScript' },
          { id: 17, name: 'HTML/CSS' },
        ],
      },
      {
        id: 7,
        name: '웹 프레임워크',
        items: [
          { id: 9, name: 'React' },
          { id: 10, name: 'Next.js' },
          { id: 18, name: 'Vue.js' },
        ],
      },
    ],
  },
  {
    id: 1,
    name: '백엔드',
    subCategories: [
      {
        id: 11,
        name: '프로그래밍 언어',
        items: [
          { id: 12, name: 'Python' },
          { id: 19, name: 'Java' },
          { id: 20, name: 'Go' },
        ],
      },
      {
        id: 13,
        name: '웹 프레임워크',
        items: [
          { id: 14, name: 'Django' },
          { id: 21, name: 'Spring Boot' },
          { id: 15, name: 'FastAPI' },
        ],
      },
    ],
  },
]
