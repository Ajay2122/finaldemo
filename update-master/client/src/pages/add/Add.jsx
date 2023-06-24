import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Add = () => {
  // State for file uploads
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // State for gig form data
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  // Function to handle input changes in the form
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  // Function to handle adding a feature to the gig
  const handleFeature = (e) => {
    e.preventDefault();
    const feature = e.target[0].value.trim();
    if (feature !== "") {
      dispatch({
        type: "ADD_FEATURE",
        payload: feature,
      });
      e.target[0].value = "";
    }
  };

  // Function to handle uploading files
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Mutation for sending the gig data to the server
  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Filed is wrong", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/add");
    },
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      if (!singleFile || files.length === 0) {
        toast.error("Please upload an image", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "dark",
        });
        return;
      }

      const isEmpty = Object.values(state).some(
        (value) => value === "" || value === "provide details"
      );
      mutation.mutate(state);
      if (isEmpty) {
        toast.error("Please fill in all fields", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "dark",
        });
        return;
      }

      toast.success("Gig created successfully!", {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
      navigate("/mygigs");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            {/* Gig information section */}
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
              required
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="none">Choose One Category</option>
              <option value="web">Web Development</option>
              <option value="design">Design</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="wordPress">Word Press</option>
              <option value="Ai">AI Artists</option>
              <option value="Video...Animation">Video & Animation</option>
              <option value="social...Media">Social Media</option>
              <option value="Digital...Marketing">Digital Marketing</option>
              <option value="Programming...Tech">Programming & Tech</option>
              <option value="Business">Business</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
            <div className="images">
              {/* Image upload section */}
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                  required
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  required
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
              required
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            {/* Gig details section */}
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
              required
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              required
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
              required
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {/* Display added features */}
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
