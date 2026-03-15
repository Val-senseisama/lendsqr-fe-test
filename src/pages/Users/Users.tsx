import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userService } from "../../services/userService";
import type { User } from "../../types/user";
import { showToast } from "../../helpers/Toast";
import EmptyState from "../../components/UI/EmptyState";
import { Users as UsersIcon, RefreshCw } from "lucide-react";
import Button from "../../components/UI/Button";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      showToast.error("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="users-page">
        <h1>Users</h1>
        <div className="flex-center" style={{ padding: "100px 0" }}>
          <RefreshCw className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="users-page">
        <h1>Users</h1>
        <EmptyState
          title="No users found"
          description="It seems there are no users at the moment."
          icon={<UsersIcon size={48} />}
          action={
            <Button onClick={fetchUsers} size="small" variant="outline">
              Try Again
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="users-page-header">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link
                to={`/users/${user.id}`}
              >{`${user.profile.firstName} ${user.profile.lastName}`}</Link>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
};

export default Users;
