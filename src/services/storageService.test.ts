import { describe, it, expect, beforeEach } from "vitest";
import { storageService } from "./storageService";
import type { UserSummary } from "../types/user";

const makeUser = (id: string, overrides: Partial<UserSummary> = {}): UserSummary => ({
  id,
  organization: "Lendsqr",
  username: `user_${id}`,
  email: `user${id}@example.com`,
  phoneNumber: "08012345678",
  dateJoined: "2024-01-01T00:00:00.000Z",
  status: "Active",
  ...overrides,
});

beforeEach(() => {
  localStorage.clear();
});

// ─── selectedUser ─────────────────────────────────────────────────────────────
describe("storageService — selectedUser", () => {
  describe("positive", () => {
    it("stores and retrieves a user", () => {
      const user = makeUser("1");
      storageService.setSelectedUser(user);
      expect(storageService.getSelectedUser()).toEqual(user);
    });

    it("overwrites the previously stored user", () => {
      storageService.setSelectedUser(makeUser("1"));
      const newer = makeUser("2");
      storageService.setSelectedUser(newer);
      expect(storageService.getSelectedUser()).toEqual(newer);
    });

    it("persists all fields correctly", () => {
      const user = makeUser("99", { organization: "Irorun", status: "Blacklisted" });
      storageService.setSelectedUser(user);
      const stored = storageService.getSelectedUser();
      expect(stored.organization).toBe("Irorun");
      expect(stored.status).toBe("Blacklisted");
    });
  });

  describe("negative", () => {
    it("returns null when nothing is stored", () => {
      expect(storageService.getSelectedUser()).toBeNull();
    });

    it("returns null after clearSelectedUser", () => {
      storageService.setSelectedUser(makeUser("1"));
      storageService.clearSelectedUser();
      expect(storageService.getSelectedUser()).toBeNull();
    });

    it("clearSelectedUser is a no-op when nothing is stored", () => {
      expect(() => storageService.clearSelectedUser()).not.toThrow();
      expect(storageService.getSelectedUser()).toBeNull();
    });
  });
});

// ─── recentSearches ───────────────────────────────────────────────────────────
describe("storageService — recentSearches", () => {
  describe("positive", () => {
    it("returns empty array when nothing is stored", () => {
      expect(storageService.getRecentSearches()).toEqual([]);
    });

    it("adds a user to the front of recent searches", () => {
      const user = makeUser("1");
      storageService.addRecentSearch(user);
      expect(storageService.getRecentSearches()[0]).toEqual(user);
    });

    it("newer entries appear at the front", () => {
      storageService.addRecentSearch(makeUser("1"));
      storageService.addRecentSearch(makeUser("2"));
      const [first, second] = storageService.getRecentSearches();
      expect(first.id).toBe("2");
      expect(second.id).toBe("1");
    });

    it("re-adding an existing user moves it to the front", () => {
      const u1 = makeUser("1");
      const u2 = makeUser("2");
      storageService.addRecentSearch(u1);
      storageService.addRecentSearch(u2);
      storageService.addRecentSearch(u1); // bring u1 back to front
      const searches = storageService.getRecentSearches();
      expect(searches[0].id).toBe("1");
      expect(searches[1].id).toBe("2");
    });

    it("deduplication keeps only one copy of each user", () => {
      const u = makeUser("1");
      storageService.addRecentSearch(u);
      storageService.addRecentSearch(u);
      storageService.addRecentSearch(u);
      expect(storageService.getRecentSearches()).toHaveLength(1);
    });

    it("caps list at 5 entries", () => {
      for (let i = 1; i <= 7; i++) {
        storageService.addRecentSearch(makeUser(String(i)));
      }
      expect(storageService.getRecentSearches()).toHaveLength(5);
    });

    it("oldest entries are dropped when cap is reached", () => {
      for (let i = 1; i <= 6; i++) {
        storageService.addRecentSearch(makeUser(String(i)));
      }
      const ids = storageService.getRecentSearches().map((u) => u.id);
      expect(ids).not.toContain("1"); // first added is dropped
      expect(ids).toContain("6");
    });

    it("clearRecentSearches empties the list", () => {
      storageService.addRecentSearch(makeUser("1"));
      storageService.addRecentSearch(makeUser("2"));
      storageService.clearRecentSearches();
      expect(storageService.getRecentSearches()).toEqual([]);
    });
  });

  describe("negative", () => {
    it("clearRecentSearches is a no-op on an empty list", () => {
      expect(() => storageService.clearRecentSearches()).not.toThrow();
      expect(storageService.getRecentSearches()).toEqual([]);
    });

    it("does not store the same user twice even with different field values if id matches", () => {
      // Only id is used for dedup — other fields come from the newer call
      storageService.addRecentSearch(makeUser("1", { username: "original" }));
      storageService.addRecentSearch(makeUser("1", { username: "updated" }));
      const searches = storageService.getRecentSearches();
      expect(searches).toHaveLength(1);
      expect(searches[0].username).toBe("updated"); // newest wins
    });

    it("getRecentSearches returns an array, never null or undefined", () => {
      const result = storageService.getRecentSearches();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
