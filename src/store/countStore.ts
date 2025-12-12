import { create } from 'zustand'

interface CountState {
  count: number
  increase: () => void
  decrease: () => void
}

export const useCountStore = create<CountState>((set) => ({
  count: 0,
  increase: () =>
    set((state) => ({
      count: state.count + 1,
    })),
  decrease: () =>
    set((state) => ({
      count: state.count - 1,
    })),
}))

export const useDouble = () => useCountStore((state) => state.count * 2)
