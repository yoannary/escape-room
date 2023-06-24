import React, { useEffect, useState } from "react";
import "./AllRooms.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRoomsAsync,
  selectRoomsData,
  selectRoomsDataStatus,
} from "../../redux/reducers/rooms";
import { API_STATES } from "../../common/constants";

export const AllRooms = () => {
  const dispatch = useDispatch();
  const allRooms = useSelector(selectRoomsData);
  const roomsDataStatus = useSelector(selectRoomsDataStatus);

  console.log("allRooms", allRooms);
  console.log("roomsDataStatus", roomsDataStatus);

  useEffect(() => {
    console.log("in");
    if (roomsDataStatus === API_STATES.IDLE) dispatch(getAllRoomsAsync());
  }, [dispatch, roomsDataStatus, allRooms]);

  return (
    <div className="AllRooms">
      <div className="room-section">
        <div className="room-left-section">
          <div className="room-title">{allRooms[0].name}</div>

          <div className="image-section">
            <img
              className="room-photo"
              src={require("../../images/room.jpg")}
              alt="room1"
              width={"90%"}
              height={"95%"}
            />
          </div>
        </div>

        {generateDetailsAndDescription(allRooms[0])}
      </div>

      <div className="room-section">
        <div className="room-left-section">
          <div className="room-title">{allRooms[1].name}</div>

          <div className="image-section">
            <img
              className="room-photo"
              src={require("../../images/room3.jpg")}
              alt="room2"
              width={"90%"}
              height={"95%"}
            />
          </div>
        </div>
        {generateDetailsAndDescription(allRooms[1])}
      </div>

      <div className="room-section">
        <div className="room-left-section">
          <div className="room-title">{allRooms[2].name}</div>

          <div className="image-section">
            <img
              className="room-photo"
              src={require("../../images/room2.jpg")}
              alt="room3"
              width={"90%"}
              height={"95%"}
            />
          </div>
        </div>
        {generateDetailsAndDescription(allRooms[2])}
      </div>
    </div>
  );
};

const generateDetailsAndDescription = (roomInfo) => {
  console.log("roomInfo", roomInfo);
  return (
    <div className="room-info-section">
      <div className="details-section">
        <div className="details-title">Room Details:</div>
        <div className="details-body">
          <div className="left-column">
            <div className="column-key">Difficulty:</div>
            <div className="column-key">Duration: </div>
            <div className="column-key">No. of players:</div>
            <div className="column-key">Language:</div>
            <div className="column-key">Minimum age:</div>
          </div>
          <div className="right-column">
            <div className="column-key">{roomInfo?.difficulty}/10</div>
            <div className="column-key">{roomInfo?.duration} min</div>
            <div className="column-key">{roomInfo?.maxPlayers}/10</div>
            <div className="column-key">{roomInfo?.language}</div>
            <div className="column-key">{roomInfo?.minAge} years</div>
          </div>
        </div>
      </div>

      <div className="description-section">
        <div className="details-title">Description:</div>
        <div className="details-body">{roomInfo?.description}</div>
      </div>
    </div>
  );
};
