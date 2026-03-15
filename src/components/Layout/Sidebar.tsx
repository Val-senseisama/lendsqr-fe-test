import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  BriefcaseIcon,
  HomeIcon,
  UsersIcon,
  GuarantorsIcon,
  LoanIcon,
  HandshakeIcon,
  PiggyBankIcon,
  LoanRequestIcon,
  WhitelistIcon,
  KarmaIcon,
  OrganizationIcon,
  SavingsProductIcon,
  FeesChargesIcon,
  TransactionIcon,
  ServicesIcon,
  ServiceAccountIcon,
  SettlementsIcon,
  ReportsIcon,
  PreferencesIcon,
  FeesPricingIcon,
  AuditLogsIcon,
  SystemMessagesIcon,
  LogoutIcon,
} from "../../assets/icons";

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  to?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, to }) => {
  if (!to) {
    return (
      <div className="sidebar-item">
        <span className="icon">{icon}</span>
        <span className="label">{label}</span>
      </div>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
      data-label={label}
    >
      <span className="icon">{icon}</span>
      <span className="label">{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState("Switch Organization");
  const navigate = useNavigate();

  const organizations = ["Lendsqr", "Irogue", "Trust Bank", "Fintech Corp"];

  const handleOrgSelect = (org: string) => {
    setSelectedOrg(org);
    setShowOrgDropdown(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-scrollable">
        <div className="sidebar-section">
          <div
            className="switch-org-wrapper"
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
          >
            <div className="switch-org">
              <BriefcaseIcon size={16} />
              <span className="label">{selectedOrg}</span>
              <ChevronDown
                size={14}
                className={`dropdown-icon ${showOrgDropdown ? "rotate" : ""}`}
              />
            </div>
          </div>
          {showOrgDropdown && (
            <div className="org-dropdown">
              {organizations.map((org) => (
                <div
                  key={org}
                  className={`org-item ${selectedOrg === org ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrgSelect(org);
                  }}
                >
                  <span>{org}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <SidebarItem
            label="Dashboard"
            icon={<HomeIcon size={16} />}
            to="/dashboard"
          />
        </div>

        <div className="sidebar-group">
          <p className="group-title">CUSTOMERS</p>
          <SidebarItem
            label="Users"
            icon={<UsersIcon size={16} />}
            to="/users"
          />
          <SidebarItem
            label="Guarantors"
            icon={<GuarantorsIcon size={16} />}
            to="/guarantors"
          />
          <SidebarItem
            label="Loans"
            icon={<LoanIcon size={16} />}
            to="/loans"
          />
          <SidebarItem
            label="Decision Models"
            icon={<HandshakeIcon size={16} />}
            to="/decision-models"
          />
          <SidebarItem
            label="Savings"
            icon={<PiggyBankIcon size={16} />}
            to="/savings"
          />
          <SidebarItem
            label="Loan Requests"
            icon={<LoanRequestIcon size={16} />}
            to="/loan-requests"
          />
          <SidebarItem
            label="Whitelist"
            icon={<WhitelistIcon size={16} />}
            to="/whitelist"
          />
          <SidebarItem
            label="Karma"
            icon={<KarmaIcon size={16} />}
            to="/karma"
          />
        </div>

        <div className="sidebar-group">
          <p className="group-title">BUSINESSES</p>
          <SidebarItem
            label="Organization"
            icon={<OrganizationIcon size={16} />}
            to="/organization"
          />
          <SidebarItem
            label="Loan Products"
            icon={<LoanIcon size={16} />}
            to="/loan-products"
          />
          <SidebarItem
            label="Savings Products"
            icon={<SavingsProductIcon size={16} />}
            to="/savings-products"
          />
          <SidebarItem
            label="Fees and Charges"
            icon={<FeesChargesIcon size={16} />}
            to="/fees-charges"
          />
          <SidebarItem
            label="Transactions"
            icon={<TransactionIcon size={16} />}
            to="/transactions"
          />
          <SidebarItem
            label="Services"
            icon={<ServicesIcon size={16} />}
            to="/services"
          />
          <SidebarItem
            label="Service Account"
            icon={<ServiceAccountIcon size={16} />}
            to="/service-account"
          />
          <SidebarItem
            label="Settlements"
            icon={<SettlementsIcon size={16} />}
            to="/settlements"
          />
          <SidebarItem
            label="Reports"
            icon={<ReportsIcon size={16} />}
            to="/reports"
          />
        </div>

        <div className="sidebar-group">
          <p className="group-title">SETTINGS</p>
          <SidebarItem
            label="Preferences"
            icon={<PreferencesIcon size={16} />}
            to="/preferences"
          />
          <SidebarItem
            label="Fees and Pricing"
            icon={<FeesPricingIcon size={16} />}
            to="/fees-pricing"
          />
          <SidebarItem
            label="Audit Logs"
            icon={<AuditLogsIcon size={16} />}
            to="/audit-logs"
          />
        </div>
      </div>

      <div className="sidebar-footer">
        <hr className="sidebar-divider" />
        <SidebarItem
          label="System Messages"
          icon={<SystemMessagesIcon size={16} />}
          to="/system-messages"
        />
        <div
          className="sidebar-item logout-item"
          onClick={() => navigate("/login")}
        >
          <span className="icon">
            <LogoutIcon size={16} />
          </span>
          <span className="label">Logout</span>
        </div>
        <p className="sidebar-version">v1.2.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
