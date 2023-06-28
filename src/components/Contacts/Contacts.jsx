import React, { useEffect, useState } from "react";
import "./Contacts.css";
import {
  GoogleOutlined,
  InstagramOutlined,
  PhoneOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

export const Contacts = () => {
  return (
    <div className="Contacts">
      <div className="left-section">
        <div className="contacts-title">Contact with us:</div>
        <hr className="contacts-line"></hr>

        <div className="contacts-section">
          <div>
            If you want to book a room or need additional information, please
            contact us on:
          </div>
          <p>
            {" "}
            <PhoneOutlined /> +359 882 705 638{" "}
          </p>
          <p>
            <GoogleOutlined className="google-icon" /> escapeRoom@gmail.com
          </p>
          <p>
            <InstagramOutlined /> Escape.Room
          </p>
          <p>
            <LinkedinOutlined /> Linkedin profile
          </p>
        </div>
      </div>
      <div className="right-section">
        <div className="contacts-title">
          Here are our best employees for 2023
        </div>
        <hr className="contacts-line"></hr>

        <div className="employee-section">
          <div className="employee-card">
            <img
              src={require("../../images/YoannaY.jpg")}
              alt="employee1"
              width={"63%"}
              height={"70%"}
            />
            <div className="person-card-info">
              <div>Yoanna Yordanova</div>
              <div>
                <GoogleOutlined /> ioannaiordanova0150@gmail.com
              </div>
            </div>
          </div>

          <div className="employee-card">
          <img
              src={require("../../images/AlexY.png")}
              alt="employee2"
              width={"77%"}
              height={"60%"}
            />
            <div className="person-card-info">
              <div>Alexander Yanev</div>
              <div>
                <GoogleOutlined /> alexanderyanev3@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const Contacts = () => {
//   return (
//     <div className="Contacts">
//       <h1 className="contacts-title">Here are our best employees for 2022</h1>
//       <hr className="contacts-line"></hr>
//       <hr className="contacts-line"></hr>
//       <div className="cards-body">
//         <div className="person-card">
//           <img
//             src={require("../../images/YoannaY.jpg")}
//             alt="employee1"
//             width={"75%"}
//           />
//           <div className="person-card-info">
//             <div>Yoanna Yordanova</div>
//             <div>
//               <GoogleOutlined /> ioannaiordanova0150@gmail.com
//             </div>
//           </div>
//         </div>

//         <div className="person-card">
//           {/* <img
//             src={require("../../image/GeorgiD.jpg")}
//             alt="home page"
//             width="80%"
//             height="70%"
//           /> */}
//           <div className="person-card-info">
//             <div>Alexander Yanev</div>
//             <div>
//               <GoogleOutlined /> gvdonchev@gmail.com
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
