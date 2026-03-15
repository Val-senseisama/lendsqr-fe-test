import React, { useState, useEffect } from "react";
import { Users, ScrollText, Coins, SlidersHorizontal } from "lucide-react";
import { MetricCard, MetricCardSkeleton } from "../../components/UI/MetricCard";
import { UsersTable } from "../../components/UI/UsersTable";
import { TableSkeleton } from "../../components/UI/TableSkeleton";
import UserMobileCard from "../../components/UI/UserMobileCard";
import { userService } from "../../services/userService";
import { Pagination } from "../../components/UI/Pagination";
import useIsMobile from "../../hooks/useIsMobile";
import type { UserSummary } from "../../types/user";
import { FilterModal } from "../../components/UI/FilterModal";
import type { FilterValues } from "../../components/UI/FilterModal";
import EmptyState from "../../components/UI/EmptyState";

const applyFilters = (users: UserSummary[], filters: FilterValues): UserSummary[] => {
  return users.filter((user) => {
    if (filters.organization && !user.organization.toLowerCase().includes(filters.organization.toLowerCase())) return false;
    if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) return false;
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      const userDate = new Date(user.dateJoined).toDateString();
      if (filterDate !== userDate) return false;
    }
    return true;
  });
};

const SHEET_DURATION = 220;

const UsersPage: React.FC = () => {
  const [allUsers, setAllUsers] = useState<UserSummary[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserSummary[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterValues | null>(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isClosingFilter, setIsClosingFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getUsers();
        setAllUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setFetchError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const closeFilter = (cb?: () => void) => {
    setIsClosingFilter(true);
    setTimeout(() => {
      setShowMobileFilter(false);
      setIsClosingFilter(false);
      cb?.();
    }, SHEET_DURATION);
  };

  const handleFilter = (filters: FilterValues) => {
    closeFilter(() => {
      setActiveFilters(filters);
      setFilteredUsers(applyFilters(allUsers, filters));
      setCurrentPage(1);
    });
  };

  const handleReset = () => {
    closeFilter(() => {
      setActiveFilters(null);
      setFilteredUsers(allUsers);
      setCurrentPage(1);
    });
  };

  const activeFilterCount = activeFilters
    ? Object.values(activeFilters).filter(Boolean).length
    : 0;

  const organizations = [...new Set(allUsers.map((u) => u.organization))].sort();

  const totalItems = filteredUsers.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        {isMobile && !loading && (
          <button
            className={`mobile-filter-btn ${activeFilterCount > 0 ? "active" : ""}`}
            onClick={() => setShowMobileFilter(true)}
          >
            <SlidersHorizontal size={18} />
            {activeFilterCount > 0 && (
              <span className="filter-badge">{activeFilterCount}</span>
            )}
          </button>
        )}
      </div>

      {showMobileFilter && (
        <div
          className={`mobile-filter-overlay${isClosingFilter ? " closing" : ""}`}
          onClick={() => closeFilter()}
        >
          <div className="mobile-filter-sheet" onClick={(e) => e.stopPropagation()}>
            <FilterModal
              onFilter={handleFilter}
              onReset={handleReset}
              onClose={() => closeFilter()}
              organizations={organizations}
            />
          </div>
        </div>
      )}

      <div className="metric-cards-grid">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
        ) : (
          <>
            <MetricCard
              label="Users"
              value="2,453"
              icon={<Users size={18} />}
              iconBgColor="rgba(223, 24, 255, 0.1)"
              iconColor="#df18ff"
            />
            <MetricCard
              label="Active Users"
              value="2,453"
              icon={<Users size={18} />}
              iconBgColor="rgba(87, 24, 255, 0.1)"
              iconColor="#5718ff"
            />
            <MetricCard
              label="Users with Loans"
              value="12,453"
              icon={<ScrollText size={18} />}
              iconBgColor="rgba(245, 95, 68, 0.1)"
              iconColor="#f55f44"
            />
            <MetricCard
              label="Users with Savings"
              value="102,453"
              icon={<Coins size={18} />}
              iconBgColor="rgba(254, 24, 68, 0.1)"
              iconColor="#ff1944"
            />
          </>
        )}
      </div>

      <div className="table-wrapper">
        {fetchError ? (
          <EmptyState
            title="Failed to load users"
            description={fetchError}
            action={
              <button
                className="btn btn--primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            }
          />
        ) : loading ? (
          <TableSkeleton />
        ) : isMobile ? (
          <>
            <UserMobileCard users={currentItems} />
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        ) : (
          <>
            <UsersTable
              users={currentItems}
              loading={false}
              onFilter={handleFilter}
              onReset={handleReset}
              organizations={organizations}
            />
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
