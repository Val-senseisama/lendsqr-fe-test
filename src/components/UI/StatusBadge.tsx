import React from "react";

interface StatusBadgeProps {
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "Active":
        return "status-active";
      case "Inactive":
        return "status-inactive";
      case "Pending":
        return "status-pending";
      case "Blacklisted":
        return "status-blacklisted";
      default:
        return "";
    }
  };

  return <span className={`status-badge ${getStatusClass()}`}>{status}</span>;
};
