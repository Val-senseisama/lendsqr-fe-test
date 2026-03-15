import type { User, UserSummary } from "../types/user";

export const storageService = {
  setSelectedUser: (user: User | UserSummary) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
  },
  
  getSelectedUser: () => {
    const user = localStorage.getItem("selectedUser");
    return user ? JSON.parse(user) : null;
  },
  
  clearSelectedUser: () => {
    localStorage.removeItem("selectedUser");
  }
};
