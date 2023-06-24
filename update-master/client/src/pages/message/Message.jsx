
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id], // Include id in the query key to fetch specific conversation messages
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]); // Invalidate specific conversation messages cache
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = e.target[0].value;
    if (messageText.trim() !== "") {
      mutation.mutate({
        conversationId: id,
        desc: messageText,
      });
      e.target[0].value = "";
    }
  };

  // Group messages by date
  const groupedMessages = {};
  if (data) {
    data.forEach((message) => {
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(message);
    });
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Error loading messages."
        ) : (
          <div className="messages">
            {Object.keys(groupedMessages).map((date) => (
              <div key={date}>
                <h3 className="centered-date">{moment(date).format("MMMM DD, YYYY")}</h3>
                <h1></h1>
                {groupedMessages[date].map((m) => (
                  <div
                    className={
                      m.userId === currentUser.user._id ? "owner item" : "item"
                    }
                    key={m._id}
                  >
                    {/* <img src={m.img} alt="" /> */}
                    <p>{m.desc}</p>
                    <span>{moment(m.createdAt).format("HH:mm")}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="Write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;

