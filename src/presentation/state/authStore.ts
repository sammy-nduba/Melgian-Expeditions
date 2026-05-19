import { create } from "zustand";

type AuthState = {
  token: string | null;
  adminUser: { email: string; fullName: string } | null;
  login: (token: string, user: { email: string; fullName: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const useAuthStore = create<AuthState>((set) => {
  // Load initial state safely from localStorage if on the client
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const storedUser = typeof window !== "undefined" ? localStorage.getItem("admin_user") : null;

  return {
    token: storedToken,
    adminUser: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: !!storedToken,

    login: (token, user) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", token);
        localStorage.setItem("admin_user", JSON.stringify(user));
      }
      set({ token, adminUser: user, isAuthenticated: true });
    },

    logout: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
      }
      set({ token: null, adminUser: null, isAuthenticated: false });
    },
  };
});
