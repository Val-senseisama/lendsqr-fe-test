import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSecure?: boolean;
}

const Input: React.FC<InputProps> = ({ isSecure, className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = isSecure && showPassword ? "text" : props.type || "text";

  return (
    <div className={`input-wrapper ${className || ""}`}>
      <input className="base-input" {...props} type={inputType} />
      {isSecure && (
        <button
          type="button"
          className="secure-toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      )}
    </div>
  );
};

export default Input;
