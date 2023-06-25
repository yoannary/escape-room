import * as React from "react";
import "./App.css";
import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/reducers/userData";
import { auth } from "./config/firebase-config";
import { Register } from "./components/Register/Register";
import { useAuthState } from "react-firebase-hooks/auth";
import { getUserData } from "./services/userData.service";
import { AllRooms } from "./components/AllRooms/AllRooms";
import BookRoom from "./components/BookRoom/BookRoom";
import Footer from "./components/Footer/Footer";
import { About } from "./components/About/About";
import { Contacts } from "./components/Contacts/Contacts";

function App() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  console.log("user", user);

  useEffect(() => {
    if (user === null) return;

    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        }
        console.log(
          "snapshot.val()[Object.keys(snapshot.val())[0]]",
          snapshot.val()[Object.keys(snapshot.val())[0]]
        );
        dispatch(setUserData(snapshot.val()[Object.keys(snapshot.val())[0]]));
      })
      .catch((e) => alert(e.message));
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="body">
          <Routes>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/all-rooms" element={<AllRooms />} />
            <Route path="/book-a-room" element={<BookRoom />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
