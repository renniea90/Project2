import { create } from 'zustand';

const useStore = create((set) => ({
    email: '',
    isAuthenticated: false,
    isAdmin: false,
    setEmail: (email) => set({ email }),
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setIsAdmin: (isAdmin) => set({ isAdmin }),
  }));
  
  export default useStore;