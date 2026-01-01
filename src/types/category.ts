export interface CategoryNode {
  id: number
  name: string
}

export interface CategoryValue {
  main: CategoryNode | null
  middle: CategoryNode | null
  sub: CategoryNode | null
}
