import { useState, useEffect, useRef } from "react";
import { userService } from "../services/userService";
import type { User, UserSummary } from "../types/user";

export interface SearchResult extends UserSummary {
  fullName: string;
}

// Module-level cache so we don't re-fetch on every keystroke
let usersCache: User[] | null = null;

const toResult = (u: User): SearchResult => ({
  id: u.id,
  organization: u.organization,
  username: u.username,
  email: u.email,
  phoneNumber: u.phoneNumber,
  dateJoined: u.dateJoined,
  status: u.status,
  fullName: `${u.profile.firstName} ${u.profile.lastName}`,
});

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        if (!usersCache) {
          usersCache = await userService.getUsers();
        }

        const q = query.toLowerCase();
        const filtered = usersCache
          .filter(
            (u) =>
              u.username.toLowerCase().includes(q) ||
              u.email.toLowerCase().includes(q) ||
              u.organization.toLowerCase().includes(q) ||
              `${u.profile.firstName} ${u.profile.lastName}`.toLowerCase().includes(q),
          )
          .slice(0, 6)
          .map(toResult);

        setResults(filtered);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const clearQuery = () => {
    setQuery("");
    setResults([]);
  };

  return { query, setQuery, results, loading, clearQuery };
};
