import React from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck } from "lucide-react";
import { MetricCard } from "../../components/UI/MetricCard";
import WithLoansSvg from "../../assets/icons/with-loans.svg?react";
import CoinsSvg from "../../assets/icons/coins.svg?react";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      <div className="metric-cards-grid">
        <MetricCard
          label="Users"
          value="2,453"
          icon={<Users size={20} />}
          iconBgColor="rgba(223, 24, 255, 0.1)"
          iconColor="#df18ff"
        />
        <MetricCard
          label="Active Users"
          value="2,453"
          icon={<UserCheck size={20} />}
          iconBgColor="rgba(87, 24, 255, 0.1)"
          iconColor="#5718ff"
        />
        <MetricCard
          label="Users with Loans"
          value="12,453"
          icon={<WithLoansSvg width={20} height={20} />}
          iconBgColor="rgba(245, 95, 68, 0.1)"
          iconColor="#f55f44"
        />
        <MetricCard
          label="Users with Savings"
          value="102,453"
          icon={<CoinsSvg width={20} height={20} />}
          iconBgColor="rgba(255, 51, 102, 0.1)"
          iconColor="#ff3366"
        />
      </div>

      <nav style={{ marginTop: "40px" }}>
        <ul>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
