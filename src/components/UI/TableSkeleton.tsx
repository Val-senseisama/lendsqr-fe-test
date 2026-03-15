import React from "react";

export const TableSkeleton: React.FC = () => {
  const skeletonRows = Array.from({ length: 10 });
  const skeletonCols = Array.from({ length: 6 });

  return (
    <div className="table-skeleton-container">
      <div className="table-header-skeleton">
        {skeletonCols.map((_, i) => (
          <div key={i} className="header-cell-skeleton skeleton-animate"></div>
        ))}
      </div>
      <div className="table-body-skeleton">
        {skeletonRows.map((_, i) => (
          <div key={i} className="table-row-skeleton">
            {skeletonCols.map((_, j) => (
              <div key={j} className="body-cell-skeleton">
                <div className="cell-content-skeleton skeleton-animate"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
