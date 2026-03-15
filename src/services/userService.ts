import type { User } from "../types/user";

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch("/users.json");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
};
