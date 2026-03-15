import React from "react";
import { useNavigate } from "react-router-dom";
import { storageService } from "../../services/storageService";
import { StatusBadge } from "./StatusBadge";
import type { UserSummary } from "../../types/user";

interface Props {
  users: UserSummary[];
}

const UserMobileCard: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();

  const handleClick = (user: UserSummary) => {
    storageService.setSelectedUser(user as never);
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="user-mobile-cards">
      {users.map((user) => (
        <div
          key={user.id}
          className="user-mobile-card"
          onClick={() => handleClick(user)}
        >
          <div className="user-mobile-card__header">
            <span className="user-mobile-card__org">{user.organization}</span>
            <StatusBadge status={user.status} />
          </div>

          <h3 className="user-mobile-card__name">{user.username}</h3>

          <div className="user-mobile-card__row">
            <span className="user-mobile-card__label">Email</span>
            <span className="user-mobile-card__value">{user.email}</span>
          </div>

          <div className="user-mobile-card__row">
            <span className="user-mobile-card__label">Phone</span>
            <span className="user-mobile-card__value">{user.phoneNumber}</span>
          </div>

          <div className="user-mobile-card__row">
            <span className="user-mobile-card__label">Date Joined</span>
            <span className="user-mobile-card__value">
              {new Date(user.dateJoined).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserMobileCard;
