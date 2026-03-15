import React from "react";

export const UserDetailsSkeleton: React.FC = () => {
  return (
    <div className="user-details-page skeleton-loading">
      <div
        className="back-link skeleton"
        style={{ width: "150px", height: "20px" }}
      ></div>

      <div className="page-header">
        <div
          className="skeleton"
          style={{ width: "200px", height: "30px" }}
        ></div>
        <div className="header-actions">
          <div
            className="skeleton"
            style={{ width: "150px", height: "40px", borderRadius: "8px" }}
          ></div>
          <div
            className="skeleton"
            style={{ width: "150px", height: "40px", borderRadius: "8px" }}
          ></div>
        </div>
      </div>

      <div className="user-header-card">
        <div className="header-main-info">
          <div
            className="avatar-wrapper skeleton"
            style={{ borderRadius: "50%" }}
          ></div>

          <div className="user-name-id">
            <div
              className="skeleton"
              style={{ width: "150px", height: "25px", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton"
              style={{ width: "100px", height: "15px" }}
            ></div>
          </div>

          <div className="user-tier">
            <div
              className="skeleton"
              style={{ width: "80px", height: "15px", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton"
              style={{ width: "60px", height: "20px" }}
            ></div>
          </div>

          <div className="user-balance">
            <div
              className="skeleton"
              style={{ width: "150px", height: "25px", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton"
              style={{ width: "180px", height: "15px" }}
            ></div>
          </div>
        </div>

        <div className="header-tabs">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="skeleton"
              style={{ width: "100px", height: "20px", marginBottom: "10px" }}
            ></div>
          ))}
        </div>
      </div>

      <div className="details-card">
        {[1, 2].map((section) => (
          <div key={section} className="details-section">
            <div
              className="skeleton"
              style={{ width: "200px", height: "20px", marginBottom: "30px" }}
            ></div>
            <div className="details-grid">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="detail-item">
                  <div
                    className="skeleton"
                    style={{
                      width: "80px",
                      height: "12px",
                      marginBottom: "8px",
                    }}
                  ></div>
                  <div
                    className="skeleton"
                    style={{ width: "120px", height: "18px" }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
