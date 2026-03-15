import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import logo from "../../assets/logo.svg";
import illustration from "../../assets/pablo-sign-in 1.svg";
import { showToast } from "../../helpers/Toast";
import { Validate } from "../../helpers/Validate";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const previous = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "light");
    return () => {
      if (previous) document.documentElement.setAttribute("data-theme", previous);
    };
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!Validate.email(email)) {
      showToast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 5) {
      showToast.error("Password is too short");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("isAuthenticated", "true");
      showToast.success("Login successful!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          <img src={logo} alt="Lendsqr Logo" className="logo" />
        </div>
        <div className="illustration-container">
          <img
            src={illustration}
            alt="Sign In Illustration"
            className="illustration"
          />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h1 className="welcome-heading">Welcome!</h1>
          <p className="welcome-subtext">Enter details to login.</p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isSecure
                required
              />
            </div>

            <a href="#" className="forgot-password">
              FORGOT PASSWORD?
            </a>

            <Button type="submit" isLoading={isLoading} size="large">
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
