import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loaderMessages = [
  "Fetching user records...",
  "Analyzing borrower data...",
  "Syncing account metrics...",
  "Verifying capital data...",
  "Building analytics view...",
];

const PageLoader: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loaderMessages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-loader-overlay">
      <div className="page-loader-content">
        <DotLottieReact
          src="/loader.lottie"
          loop
          autoplay
          className="page-loader-animation"
        />
        <p className="page-loader-message">{loaderMessages[messageIndex]}</p>
      </div>
    </div>
  );
};

export default PageLoader;
