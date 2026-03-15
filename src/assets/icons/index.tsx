import React from "react";

// Import all SVGs as React components (Vite ?react suffix)
import BriefcaseSvg from "./briefcase.svg?react";
import HomeSvg from "./home.svg?react";
import UsersSvg from "./users.svg?react";
import GuarantorsSvg from "./guarantors.svg?react";
import LoanSvg from "./loan.svg?react";
import HandshakeSvg from "./handshake.svg?react";
import PiggyBankSvg from "./piggybank.svg?react";
import LoanRequestSvg from "./loanRequest.svg?react";
import WhitelistSvg from "./whitelist.svg?react";
import KarmaSvg from "./karma.svg?react";
import OrganizationSvg from "./organization.svg?react";
import SavingsSvg from "./savings.svg?react";
import FeesSvg from "./fees.svg?react";
import TransactionsSvg from "./transactions.svg?react";
import ServicesSvg from "./services.svg?react";
import ServiceAccountSvg from "./service-account.svg?react";
import SettlementsSvg from "./settlements.svg?react";
import ReportsSvg from "./reports.svg?react";
import PreferencesSvg from "./preferences.svg?react";
import FeesPricingSvg from "./fees-and-pricing.svg?react";
import AuditLogsSvg from "./audit-logs.svg?react";
import SystemMessagesSvg from "./system-messages.svg?react";
import LogoutSvg from "./logout.svg?react";
import BackArrowSvg from "./back-arrow.svg?react";

interface IconProps {
  size?: number;
  className?: string;
}

const wrap =
  (Svg: React.FC<React.SVGProps<SVGSVGElement>>): React.FC<IconProps> =>
  ({ size = 16, className }) =>
    <Svg width={size} height={size} className={className} />;

export const BriefcaseIcon = wrap(BriefcaseSvg);
export const HomeIcon = wrap(HomeSvg);
export const UsersIcon = wrap(UsersSvg);
export const GuarantorsIcon = wrap(GuarantorsSvg);
export const LoanIcon = wrap(LoanSvg);
export const HandshakeIcon = wrap(HandshakeSvg);
export const PiggyBankIcon = wrap(PiggyBankSvg);
export const LoanRequestIcon = wrap(LoanRequestSvg);
export const WhitelistIcon = wrap(WhitelistSvg);
export const KarmaIcon = wrap(KarmaSvg);
export const OrganizationIcon = wrap(OrganizationSvg);
export const SavingsProductIcon = wrap(SavingsSvg);
export const FeesChargesIcon = wrap(FeesSvg);
export const TransactionIcon = wrap(TransactionsSvg);
export const ServicesIcon = wrap(ServicesSvg);
export const ServiceAccountIcon = wrap(ServiceAccountSvg);
export const SettlementsIcon = wrap(SettlementsSvg);
export const ReportsIcon = wrap(ReportsSvg);
export const PreferencesIcon = wrap(PreferencesSvg);
export const FeesPricingIcon = wrap(FeesPricingSvg);
export const AuditLogsIcon = wrap(AuditLogsSvg);
export const SystemMessagesIcon = wrap(SystemMessagesSvg);
export const LogoutIcon = wrap(LogoutSvg);
export const BackArrowIcon = wrap(BackArrowSvg);
