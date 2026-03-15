import type { User, UserSummary } from "../types/user";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT = 5;

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
  },

  getRecentSearches: (): UserSummary[] => {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addRecentSearch: (user: UserSummary) => {
    const current = storageService.getRecentSearches();
    const deduped = current.filter((u) => u.id !== user.id);
    const updated = [user, ...deduped].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  },

  clearRecentSearches: () => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  },
};
