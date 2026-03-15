import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSvg from "../../assets/icons/filter.svg?react";
import type { UserSummary } from "../../types/user";
import { StatusBadge } from "./StatusBadge";
import { ActionMenu } from "./ActionMenu";
import type { FilterValues } from "./FilterModal";
import { FilterModal } from "./FilterModal";
import { storageService } from "../../services/storageService";

interface UsersTableProps {
  users: UserSummary[];
  loading: boolean;
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
  organizations?: string[];
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, loading, onFilter, onReset, organizations = [] }) => {
  const navigate = useNavigate();
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(
    null,
  );

  const handleRowClick = (user: UserSummary) => {
    storageService.setSelectedUser(user);
    navigate(`/users/${user.id}`);
  };

  const handleFilterToggle = (column: string) => {
    setActiveFilterColumn(activeFilterColumn === column ? null : column);
  };

  const handleFilter = (filters: FilterValues) => {
    onFilter(filters);
    setActiveFilterColumn(null);
  };

  const handleReset = () => {
    onReset();
    setActiveFilterColumn(null);
  };

  const columns = [
    { key: "organization", label: "ORGANIZATION" },
    { key: "username", label: "USERNAME" },
    { key: "email", label: "EMAIL" },
    { key: "phoneNumber", label: "PHONE NUMBER" },
    { key: "dateJoined", label: "DATE JOINED" },
    { key: "status", label: "STATUS" },
  ];

  if (loading) return null; // Let the parent handle skeleton if needed, or we can use TableSkeleton here

  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                <div className="header-content">
                  <span>{col.label}</span>
                  <button
                    className="filter-trigger"
                    onClick={() => handleFilterToggle(col.key)}
                  >
                    <FilterSvg width={16} height={11} />
                  </button>
                  {activeFilterColumn === col.key && (
                    <FilterModal
                      onFilter={handleFilter}
                      onReset={handleReset}
                      onClose={() => setActiveFilterColumn(null)}
                      organizations={organizations}
                    />
                  )}
                </div>
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {new Date(user.dateJoined).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>
              <td>
                <StatusBadge status={user.status} />
              </td>
              <td>
                <ActionMenu user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
