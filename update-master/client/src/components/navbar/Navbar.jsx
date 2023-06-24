
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.scss";
import { useLogoutUserMutation } from "../../service/userAuthApi";

function Navbar() {
  // State variables
  const [active, setActive] = useState(false); // Controls navbar active state
  const [open, setOpen] = useState(false); // Controls user dropdown menu state

  // Hooks and references
  const { pathname } = useLocation(); // Gets current location path
  const dropdownRef = useRef(null); // Reference for the user dropdown menu

  // Function to check if navbar should be active
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    // Event listeners for scroll and outside click
    window.addEventListener("scroll", isActive);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      // Cleanup event listeners
      window.removeEventListener("scroll", isActive);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Handle outside click to close dropdown menu
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  // Retrieve current user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const [logoutUser, { isLoading: logoutLoading }] = useLogoutUserMutation();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.setItem("currentUser", null);
      toast.success("Logout successfully!", {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Skillify</span>
          </Link>
          <span className="dot">.</span>
        </div>
        {/* Links */}
        <div className="links">
          <span>Skillify Business</span>
          {/* Show "Become a Seller" link if user is not a seller */}
          {!currentUser?.user.isSeller && <span>Become a Seller</span>}
          {currentUser ? (
            // User dropdown menu
            <div
              className="user"
              onClick={() => setOpen(!open)}
              ref={dropdownRef}
            >
              <img src={currentUser?.user.img || "/img/noavatar.jpg"} alt="" />
              {open && (
                <div className="options">
                  <Link className="link" to="/profile">
                    Profile
                  </Link>
                  {/* Show "Gigs" and "Add New Gig" links if user is a seller */}
                  {currentUser.user.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  {/* <Link className="link" to="/messages">
                    Messages
                  </Link> */}
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // Show "Sign in" and "Join" links if user is not logged in
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Show menu links when navbar is active or not on the home page */}
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            {/* Menu links */}
            <Link className="link menuLink" to="/gigs?cat=design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Video...Animation">
              Video & Animation
            </Link>
            <Link
              className="link menuLink"
              to="/gigs?cat=Writing...Translation"
            >
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Ai">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Digital...Marketing">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=music">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Programming...Tech">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Business">
              Business
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Lifestyle">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
