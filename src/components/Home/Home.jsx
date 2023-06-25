import * as React from "react";
import { useContext, useEffect, useState } from "react";
import "./Home.css";
// import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Login from "../Login/Login";

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prev) => !prev);

  return (
    <div className="Home">
      <div className="home-left-section">
        <div className="text-section">
          <div className="first-title">Welcome to EscapeRoom!</div>
          <div className="title-slogan">
            Behind every successful escape, there is teamwork!
          </div>
          <div className="title-slogan">
            If tou want to join us,{" "}
            <Button type="text" onClick={handleClose}>
              sign in
            </Button>{" "}
            and book a room now.
          </div>
        </div>
        <div className="home-image-section">
          <div>
            <img
              className="room-photo"
              src={require("../../images/home1.png")}
              alt="img1"
              width={"80%"}
              height={"70%"}
            />
          </div>
          <div>
            <img
              className="room-photo"
              src={require("../../images/home2.png")}
              alt="img1"
              width={"100%"}
              height={"70%"}
            />
          </div>
        </div>
        <div className="button-section">
          <NavLink to="/register">Register now</NavLink>
          <NavLink to="/about-us">About us</NavLink>
        </div>
      </div>
      <Login open={open} handleClose={handleClose} />
    </div>
  );
};

export default Home;
