import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.svg";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  Menu,
  Clock,
  X,
  Loader,
  BookOpen,
} from "lucide-react";
import userAvatar from "../../assets/hero.png";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { storageService } from "../../services/storageService";
import type { UserSummary } from "../../types/user";
import { StatusBadge } from "../UI/StatusBadge";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<UserSummary[]>([]);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { query, setQuery, results, loading, clearQuery } = useSearch();
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches whenever dropdown opens
  useEffect(() => {
    if (showSearchDropdown) {
      setRecentSearches(storageService.getRecentSearches());
    }
  }, [showSearchDropdown]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleResultClick = (user: UserSummary) => {
    storageService.addRecentSearch(user);
    storageService.clearSelectedUser(); // force UserDetails to fetch the full user
    clearQuery();
    setShowSearchDropdown(false);
    navigate(`/users/${user.id}`);
  };

  const handleClearRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.clearRecentSearches();
    setRecentSearches([]);
  };

  const showResults = query.length >= 3;
  const showRecent = !showResults && recentSearches.length > 0;
  const isDropdownVisible = showSearchDropdown && (showResults || showRecent || loading);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <img src={logo} alt="Lendsqr Logo" className="logo" />
      </div>

      <div className="navbar-center">
        <div className="search-container" ref={searchRef}>
          <input
            type="text"
            placeholder="Search for anything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSearchDropdown(true)}
          />
          <button className="search-btn">
            {loading ? <Loader size={14} className="spin" /> : <Search size={14} />}
          </button>

          {isDropdownVisible && (
            <div className="search-dropdown">
              {showResults && (
                <>
                  {results.length > 0 ? (
                    <>
                      <p className="search-dropdown__label">Results</p>
                      {results.map((user) => (
                        <div
                          key={user.id}
                          className="search-result-item"
                          onMouseDown={() => handleResultClick(user)}
                        >
                          <div className="search-result-item__info">
                            <span className="search-result-item__name">{user.fullName}</span>
                            <span className="search-result-item__meta">{user.email}</span>
                          </div>
                          <StatusBadge status={user.status} />
                        </div>
                      ))}
                    </>
                  ) : (
                    !loading && (
                      <p className="search-dropdown__empty">No users found for "{query}"</p>
                    )
                  )}
                </>
              )}

              {showRecent && (
                <>
                  <div className="search-dropdown__label-row">
                    <p className="search-dropdown__label">Recent Searches</p>
                    <button className="search-dropdown__clear" onMouseDown={handleClearRecent}>
                      Clear all
                    </button>
                  </div>
                  {recentSearches.map((user) => (
                    <div
                      key={user.id}
                      className="search-result-item"
                      onMouseDown={() => handleResultClick(user)}
                    >
                      <Clock size={14} className="search-result-item__clock" />
                      <div className="search-result-item__info">
                        <span className="search-result-item__name">{user.username}</span>
                        <span className="search-result-item__meta">{user.email}</span>
                      </div>
                      <button
                        className="search-result-item__remove"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          const updated = recentSearches.filter((u) => u.id !== user.id);
                          storageService.clearRecentSearches();
                          updated.forEach((u) => storageService.addRecentSearch(u));
                          // re-save in correct order
                          localStorage.setItem("recentSearches", JSON.stringify(updated));
                          setRecentSearches(updated);
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-right">
        <a href="#" className="docs-link">
          <span className="docs-text">Docs</span>
          <BookOpen size={20} className="docs-icon" />
        </a>
        <button className="notification-btn">
          <Bell size={26} />
        </button>
        <div
          className="user-profile"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <img src={userAvatar} alt="User Avatar" className="avatar" />
          <span className="user-name">Adedeji</span>
          <ChevronDown
            size={20}
            className={`dropdown-icon ${showProfileDropdown ? "rotate" : ""}`}
          />

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-item" onClick={toggleTheme}>
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </div>
              <div className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
