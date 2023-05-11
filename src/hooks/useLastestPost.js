import { create } from 'zustand';

 const useLatestPost = create((set) =>({
  latestPost: [],
  setLatestPost: (payload) => set({latestPost: payload}),
 }))

 export default useLatestPost;