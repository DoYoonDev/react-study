import { create } from 'zustand'

const countStore = create((set) => ({
    count:1,
    increase: () => set((state) => ({count: state.count + 1})), // increase count by 1
    decrease: () => set((state) => ({count: state.count - 1})), // decrease count by 1
    increaseBy: (num) => set((state) => ({count: state.count + num})), // increase count by num
    decreaseBy: (num) => set((state) => ({count: state.count - num})), // decrease count by num
}));

export default countStore
