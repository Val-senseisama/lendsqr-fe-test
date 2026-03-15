import React from "react";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBgColor?: string;
  iconColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  label,
  value,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="metric-card">
      <div
        className="icon-container"
        style={{
          backgroundColor: iconBgColor,
          color: iconColor,
        }}
      >
        {icon}
      </div>
      <p className="label">{label}</p>
      <h3 className="value">{value}</h3>
    </div>
  );
};

export const MetricCardSkeleton: React.FC = () => {
  return (
    <div className="metric-card skeleton">
      <div className="icon-container skeleton-animate"></div>
      <div className="label-skeleton skeleton-animate"></div>
      <div className="value-skeleton skeleton-animate"></div>
    </div>
  );
};
