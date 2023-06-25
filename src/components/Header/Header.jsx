import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserData } from "../../redux/reducers/userData";
import { logoutUser } from "../../services/auth.service";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Login from "../Login/Login";

const Header = () => {
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        dispatch(logout());
        handleClose();
        navigate("/home");
      })
      .then(console.log("Logout"));
  };

  console.log("Header userData", userData);

  return (
    <div className="Header">
      <div className="logo-section">
        <img
          className="logo"
          src={require("../../images/logo.png")}
          alt="logo"
        />
      </div>

      <div className="nav-section">
        <div className="navBar">
          <NavLink to="/home">Home</NavLink>
        </div>

        <div className="navBar">
          <NavLink to="/all-rooms">All Rooms</NavLink>
        </div>
        {userData ? (
          <div className="navBar">
            <NavLink to="/book-a-room">Book a room</NavLink>
          </div>
        ) : null}
        <div className="navBar">
          <NavLink to="/about">About the game</NavLink>
        </div>
        <div className="navBar">
          <NavLink to="/contact">Contacts</NavLink>
        </div>
      </div>
      <div className="login-section">
        {userData ? (
          <>
            <div className="username-section">
              <Avatar
                className="avatar-icon"
                sx={{
                  bgcolor: "#A64942",
                  fontSize: 34,
                  width: 60,
                  height: 60,
                  mt: 0,
                  ml: 2,
                }}
              >
                {userData.username.slice(0, 1).toUpperCase()}
              </Avatar>
              <div className="username-text">{userData.username}</div>
            </div>
            <Button
              sx={{ fontSize: "25px", fontWeight: "bold", color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{ fontSize: "25px", fontWeight: "bold", color: "white" }}
              onClick={handleClose}
            >
              Login
            </Button>
            <Login open={open} handleClose={handleClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
