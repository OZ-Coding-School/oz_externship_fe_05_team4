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
    id: 1,
    name: '프론트엔드',
    subCategories: [
      {
        id: 11,
        name: '프로그래밍 언어',
        items: [
          { id: 101, name: 'JavaScript' },
          { id: 102, name: 'TypeScript' },
          { id: 103, name: 'HTML/CSS' },
        ],
      },
      {
        id: 12,
        name: '웹 프레임워크',
        items: [
          { id: 110, name: 'React' },
          { id: 111, name: 'Next.js' },
          { id: 112, name: 'Vue.js' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '백엔드',
    subCategories: [
      {
        id: 21,
        name: '프로그래밍 언어',
        items: [
          { id: 201, name: 'Python' },
          { id: 202, name: 'Java' },
          { id: 203, name: 'Go' },
        ],
      },
      {
        id: 22,
        name: '웹 프레임워크',
        items: [
          { id: 210, name: 'Django' },
          { id: 211, name: 'Spring Boot' },
          { id: 212, name: 'FastAPI' },
        ],
      },
    ],
  },
]
