import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, UserX, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { storageService } from "../../services/storageService";
import type { UserSummary } from "../../types/user";

interface ActionMenuProps {
  user: UserSummary;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewDetails = () => {
    storageService.setSelectedUser(user);
    navigate(`/users/${user.id}`);
    setIsOpen(false);
  };

  return (
    <div className="action-menu-container" ref={menuRef}>
      <button
        className="action-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="action-dropdown">
          <div className="action-item" onClick={handleViewDetails}>
            <Eye size={16} color="#545F7D" />
            <span>View Details</span>
          </div>
          <div className="action-item">
            <UserX size={16} color="#545F7D" />
            <span>Blacklist User</span>
          </div>
          <div className="action-item">
            <UserCheck size={16} color="#545F7D" />
            <span>Activate User</span>
          </div>
        </div>
      )}
    </div>
  );
};
