import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Sun,
  Moon,
  Menu,
} from "lucide-react";
import userAvatar from "../../assets/hero.png";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <img src={logo} alt="Lendsqr Logo" className="logo" />
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <input type="text" placeholder="Search for anything" />
          <button className="search-btn">
            <Search size={14} />
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <a href="#" className="docs-link">
          Docs
        </a>
        <button className="notification-btn">
          <Bell size={26} />
        </button>
        <div
          className="user-profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={userAvatar} alt="User Avatar" className="avatar" />
          <span className="user-name">Adedeji</span>
          <ChevronDown
            size={20}
            className={`dropdown-icon ${showDropdown ? "rotate" : ""}`}
          />

          {showDropdown && (
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
