import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  // Fetch user's gigs data using React Query's useQuery hook
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser.user._id}`).then((res) => {
        return res.data;
      }),
  });

  // Define a mutation to delete a gig
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      // Invalidate the myGigs query after successful mutation
      queryClient.invalidateQueries(["myGigs"]);
      toast.warn("Gig deleted successfully", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "dark",
      });
    },
  });

  // Handle deleting a gig
  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.user.isSeller && (
              <Link to="/add">
                <button>Add New Gig</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <td>deliveryTime</td>
              <td>Category</td>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.deliveryTime}</td>
                <td>{gig.cat}</td>
                <td>{gig.price}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default MyGigs;
