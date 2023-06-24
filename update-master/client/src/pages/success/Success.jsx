import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Success.scss";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        // Send a PUT request to update the order with the payment intent
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          // Redirect to the orders page after 5 seconds
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div className="success-container">
      <div className="success-box">
        {/* Success animation */}
        <div className="success-animation">
          <div className="success-circle"></div>
          <div className="success-line"></div>
          <div className="success-line"></div>
        </div>
        <div className="success-message">
          {/* Success message */}
          <h2>Payment Successful!</h2>
          <p>You are being redirected to the orders page.</p>
          <p>Please do not close the page.</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
