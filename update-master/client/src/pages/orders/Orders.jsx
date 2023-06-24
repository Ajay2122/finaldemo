

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  // Fetch orders data using React Query's useQuery hook
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        console.log(res);
        return res.data;
      }),
  });

  console.log("data",data)

  // Handle contacting the other party of an order
  const handleContact = async (order) => {
    const sellerId = order.sellerId._id;
    const buyerId = order.buyerId._id;

    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res?.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.user.isSeller ? buyerId : sellerId._id,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Meeting</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>₹ {order.price}</td>
                <td>
                 {currentUser.user.isSeller ? order.buyerId.username : order.sellerId.username}
                </td>
                <th>
                {currentUser.user.isSeller ? order.buyerId.phone : order.sellerId.phone}
                </th>
                <td>
                  <img
                    className="message"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
                <td>
                  <Link className="link" to="/video">
                    <img className="message" src="./img/video.png" alt="" />
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
