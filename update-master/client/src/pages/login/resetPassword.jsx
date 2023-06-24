import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";
import "./resetPassword.scss";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        // Display error toast message when passwords do not match
        toast.error("Passwords do not match", {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      const res = await newRequest.post(`/auth/resetPassword/${token}`, {
        password,
      });
      console.log(res);

      // Display success toast message
      toast.success("Password reset successfully", {
        position: "bottom-left",
        autoClose: 3000,
        theme: "dark",
      });

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      // Display error toast message with the response data
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
    <div className="reset-password">
      <ToastContainer />

      {/* Reset password form */}
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
