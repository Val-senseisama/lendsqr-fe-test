export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: [string, string];
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    relationship: string;
  };
}

export type UserSummary = Pick<
  User,
  "id" | "organization" | "username" | "email" | "phoneNumber" | "dateJoined" | "status"
>;
