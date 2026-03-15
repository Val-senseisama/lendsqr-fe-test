import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { User as UserIcon, Star } from "lucide-react";
import { BackArrowIcon } from "../../assets/icons";
import type { User } from "../../types/user";
import { storageService } from "../../services/storageService";
import { userService } from "../../services/userService";

import { UserDetailsSkeleton } from "../../components/UI/UserDetailsSkeleton";
import Button from "../../components/UI/Button";
import { showToast } from "../../helpers/Toast";
import EmptyState from "../../components/UI/EmptyState";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("General Details");

  const fetchUser = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const savedUser = storageService.getSelectedUser();
      if (savedUser && savedUser.id === id) {
        setUser(savedUser);
      } else {
        const fetchedUser = await userService.getUserById(id);
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      showToast.error("Failed to load user details.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return <UserDetailsSkeleton />;
  }

  if (!user) {
    return (
      <div className="user-details-page">
        <Link to="/users" className="back-link">
          <BackArrowIcon size={16} />
          <span>Back to Users</span>
        </Link>
        <EmptyState
          title="User Not Found"
          description="The user you are looking for does not exist or has been removed."
          action={
            <Button
              onClick={() => window.location.reload()}
              size="small"
              variant="outline"
            >
              Reload Page
            </Button>
          }
        />
      </div>
    );
  }

  const tabs = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  return (
    <div className="user-details-page">
      <Link to="/users" className="back-link">
        <BackArrowIcon size={16} />
        <span>Back to Users</span>
      </Link>

      <div className="page-header">
        <h1>User Details</h1>
        <div className="header-actions">
          <Button variant="outline" className="btn-blacklist" block={false}>
            Blacklist User
          </Button>
          <Button variant="outline" className="btn-activate" block={false}>
            Activate User
          </Button>
        </div>
      </div>

      <div className="user-header-card">
        <div className="header-main-info">
          <div className="avatar-wrapper">
            {user.profile.avatar ? (
              <img src={user.profile.avatar} alt={user.profile.firstName} />
            ) : (
              <UserIcon size={40} />
            )}
          </div>

          <div className="user-name-id">
            <h2>{`${user.profile.firstName} ${user.profile.lastName}`}</h2>
            <p>{user.username}</p>
          </div>

          <div className="user-tier">
            <p>User's Tier</p>
            <div className="stars">
              <Star size={16} fill="#E9B200" />
              <Star size={16} />
              <Star size={16} />
            </div>
          </div>

          <div className="user-balance">
            <h2>₦200,000.00</h2>
            <p>9912345678/Providus Bank</p>
          </div>
        </div>

        <div className="header-tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className="details-card">
        <div className="details-section">
          <h4>Personal Information</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span>Full Name</span>
              <span>{`${user.profile.firstName} ${user.profile.lastName}`}</span>
            </div>
            <div className="detail-item">
              <span>Phone Number</span>
              <span>{user.phoneNumber}</span>
            </div>
            <div className="detail-item">
              <span>Email Address</span>
              <span>{user.email}</span>
            </div>
            <div className="detail-item">
              <span>BVN</span>
              <span>{user.profile.bvn}</span>
            </div>
            <div className="detail-item">
              <span>Gender</span>
              <span>{user.profile.gender}</span>
            </div>
            <div className="detail-item">
              <span>Marital Status</span>
              <span>Single</span>
            </div>
            <div className="detail-item">
              <span>Children</span>
              <span>None</span>
            </div>
            <div className="detail-item">
              <span>Type of Residence</span>
              <span>Parent's Apartment</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h4>Education and Employment</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span>Level of Education</span>
              <span>{user.education.level}</span>
            </div>
            <div className="detail-item">
              <span>Employment Status</span>
              <span>{user.education.employmentStatus}</span>
            </div>
            <div className="detail-item">
              <span>Sector of Employment</span>
              <span>{user.education.sector}</span>
            </div>
            <div className="detail-item">
              <span>Duration of Employment</span>
              <span>{user.education.duration}</span>
            </div>
            <div className="detail-item">
              <span>Office Email</span>
              <span>{user.education.officeEmail}</span>
            </div>
            <div className="detail-item">
              <span>Monthly Income</span>
              <span>
                ₦{user.education.monthlyIncome[0]} - ₦
                {user.education.monthlyIncome[1]}
              </span>
            </div>
            <div className="detail-item">
              <span>Loan Repayment</span>
              <span>{user.education.loanRepayment}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h4>Socials</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span>Twitter</span>
              <span>{user.socials.twitter}</span>
            </div>
            <div className="detail-item">
              <span>Facebook</span>
              <span>{user.socials.facebook}</span>
            </div>
            <div className="detail-item">
              <span>Instagram</span>
              <span>{user.socials.instagram}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h4>Guarantor</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span>Full Name</span>
              <span>{`${user.guarantor.firstName} ${user.guarantor.lastName}`}</span>
            </div>
            <div className="detail-item">
              <span>Phone Number</span>
              <span>{user.guarantor.phoneNumber}</span>
            </div>
            <div className="detail-item">
              <span>Email Address</span>
              <span>{user.guarantor.firstName.toLowerCase()}@gmail.com</span>
            </div>
            <div className="detail-item">
              <span>Relationship</span>
              <span>{user.guarantor.relationship}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
