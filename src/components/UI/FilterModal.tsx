import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

interface FilterModalProps {
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
  onClose: () => void;
}

export interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  onFilter,
  onReset,
  onClose,
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    const initialFilters = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    };
    setFilters(initialFilters);
    onReset();
  };

  return (
    <div className="filter-modal">
      <button
        className="close-filter"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "18px",
          color: "#545F7D",
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <div className="filter-field">
        <label>Organization</label>
        <select
          name="organization"
          value={filters.organization}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Lendsqr">Lendsqr</option>
          <option value="Irorun">Irorun</option>
          <option value="Lendstar">Lendstar</option>
        </select>
      </div>

      <div className="filter-field">
        <label>Username</label>
        <Input
          name="username"
          placeholder="User"
          value={filters.username}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Email</label>
        <Input
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Date</label>
        <Input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Phone Number</label>
        <Input
          name="phoneNumber"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="filter-field">
        <label>Status</label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className="filter-actions">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={() => onFilter(filters)}>Filter</Button>
      </div>
    </div>
  );
};
