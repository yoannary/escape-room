import React, { useContext, useEffect, useMemo, useState } from "react";
import "./BookRoom.css";
// import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRoomsAsync,
  selectRoomsData,
  selectRoomsDataStatus,
  updateRoomAvailableAsync,
} from "../../redux/reducers/rooms";
import { API_STATES, userRole } from "../../common/constants";
import { selectUserData } from "../../redux/reducers/userData";

const BookRoom = () => {
  const dispatch = useDispatch();
  const allRooms = useSelector(selectRoomsData);
  const roomsDataStatus = useSelector(selectRoomsDataStatus);

  useEffect(() => {
    if (roomsDataStatus === API_STATES.IDLE) dispatch(getAllRoomsAsync());
  }, [dispatch, roomsDataStatus, allRooms]);

  return (
    <div className="BookRoom">
      <div className="book-room-title">Book your Escape Room here!</div>
      <div className="book-room-section">
        <div className="room-card">
          <div className="image-section">
            <img
              className="room-photo"
              src={require("../../images/room.jpg")}
              alt="room1"
              width={"90%"}
              height={"95%"}
            />
          </div>
          <BookRoomInfo roomInfo={allRooms[0]} />
        </div>

        <div className="room-card">
          <div className="image-section">
            <img
              className="room-photo"
              src={require("../../images/room3.jpg")}
              alt="room2"
              width={"90%"}
              height={"95%"}
            />
          </div>
          <BookRoomInfo roomInfo={allRooms[1]} />
        </div>

        <div className="room-card">
          <div className="image-section">
            <img
              className="room-photo"
              src={require("../../images/room2.jpg")}
              alt="room3"
              width={"90%"}
              height={"95%"}
            />
          </div>
          <BookRoomInfo roomInfo={allRooms[2]} />
        </div>
      </div>
    </div>
  );
};

const BookRoomInfo = ({ roomInfo }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const isAdmin = useMemo(() => userData?.role === userRole.ADMIN, [userData]);

  console.log("roominfo", roomInfo);

  return (
    <div className="book-section">
      <div className="book-data">Name: {roomInfo?.name}</div>
      <div className="book-data">
        Available: {roomInfo?.isAvailable ? "YES" : "NO"}
      </div>
      <div>
        <Button
          type="outlined"
          disabled={isAdmin ? false : !roomInfo?.isAvailable}
          onClick={(e) => {
            console.log("click", e);
            dispatch(
              updateRoomAvailableAsync({
                username: userData?.username,
                id: roomInfo?.id,
                isAvailable: !roomInfo?.isAvailable,
              })
            );
          }}
          sx={{ fontSize: "25px", fontWeight: "bold" }}
        >
          {isAdmin && !roomInfo?.isAvailable ? "Check as available" : "Book now"}
        </Button>
      </div>
    </div>
  );
};

export default BookRoom;
