import axios from "axios";

// Function to upload a file to Cloudinary
const upload = async (file) => {
  const data = new FormData();
  data.append("file", file); // Append the file to the FormData object
  data.append("upload_preset", "skillify"); // Append the upload preset to the FormData object

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dyi8a2s01/image/upload", data);
    // Send a POST request to Cloudinary with the data

    const { url } = res.data; // Extract the URL of the uploaded file from the response data
    return url; // Return the URL of the uploaded file
  } catch (err) {
    console.log(err); // Log any errors that occur during the upload process
  }
};

export default upload;
