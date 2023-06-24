import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const submitHandler = () => {
    navigate("/");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOldPassword("");
    setNewPassword("");
  };

  const handleChangePassword = () => {
    newRequest
      .post(`auth/changePassword/${currentUser.user._id}`, {
        oldPassword,
        newPassword,
      })
      .then((res) => {
        console.log("Password changed successfully");
        handleCloseModal();
        toast.success("Password changed successfully", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
        });
        console.error("Password change error:", error);
      });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      style={{ background: "#f5f5f5" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Your Profile
          </Typography>
          <FormControl fullWidth margin="normal">
            <div>
              <Grid container style={{ marginLeft: "40%" }}>
                <Grid item>
                  <Avatar
                    style={{ width: "100px", height: "100px" }}
                    src={currentUser?.user.img || "/img/noavatar.jpg"}
                    alt="User Icon"
                  />
                </Grid>
              </Grid>
            </div>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="UserName"
              value={currentUser.user.username}
              variant="standard"
              disabled
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Email"
              value={currentUser.user.email}
              variant="standard"
              disabled
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Phone"
              value={currentUser.user.phone}
              variant="standard"
              disabled
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Country"
              value={currentUser.user.country}
              variant="standard"
              disabled
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <TextField
              label="Description"
              value={currentUser.user.desc}
              variant="standard"
              disabled
            />
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: "10px",
                  backgroundColor: "#120f15",
                  color: "white",
                }}
                onClick={handleOpenModal}
              >
                Change Password
              </Button>
              <Dialog open={showModal} onClose={handleCloseModal}>
                <DialogTitle
                  style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                >
                  Change Password
                </DialogTitle>
                <DialogContent>
                  <TextField
                    id="old-password"
                    label="Old Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <TextField
                    id="new-password"
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="secondary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleChangePassword}
                    color="primary"
                    variant="contained"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="inherit"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={submitHandler}
              >
                Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}
