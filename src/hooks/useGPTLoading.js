import { create } from "zustand";

const useGPTLoading = create((set) => ({
  GPTLoading: false,
  onLoading: () => set({ GPTLoading: true }),
  offLoading: () => set({ GPTLoading: false }),
}));

export default useGPTLoading;
