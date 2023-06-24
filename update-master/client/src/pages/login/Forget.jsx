import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPasswordMutation } from "../../service/userAuthApi";
import "./Forget.scss";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ email });

      // Display success toast message
      toast.success("Reset password link sent to your email", {
        position: "bottom-left",
        autoClose: 3000,
        theme: "dark",
      });

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      // Display error toast message
      toast.error(err.response.data.message, {
        position: "bottom-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="forget-password">
      <ToastContainer />

      {/* Forgot password form */}
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {/* Display appropriate button text based on loading state */}
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>

      {/* Login link */}
      <p className="login-link">
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default ForgetPassword;
