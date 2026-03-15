import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const RouteError: React.FC = () => {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="route-error">
      <div className="route-error__header">
        <img src={logo} alt="Lendsqr" className="route-error__logo" />
      </div>

      <div className="route-error__body">
        <div className="route-error__code">{is404 ? "404" : "500"}</div>

        <div className="route-error__divider" />

        <div className="route-error__text">
          <h1>{is404 ? "Page not found" : "Something went wrong"}</h1>
          <p>
            {is404
              ? "Looks like this page went on a loan and never came back. Let's get you back on track."
              : "We hit an unexpected error on our end. Our team has been notified."}
          </p>
        </div>

        <div className="route-error__actions">
          <Link to="/dashboard" className="route-error__btn route-error__btn--primary">
            Back to Dashboard
          </Link>
          <button
            className="route-error__btn route-error__btn--outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>

      <div className="route-error__watermark">{is404 ? "404" : "500"}</div>
    </div>
  );
};

export default RouteError;
