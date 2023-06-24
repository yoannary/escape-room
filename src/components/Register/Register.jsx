import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "./Register.css";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { createCustomerAsync } from "../../redux/reducers/customerReducer";
// import { createEmployeeAsync } from "../../redux/reducers/employeeReducer";
import { useNavigate } from "react-router-dom";
import { createUserUsername, getUserByUsername } from "../../services/userData.service";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { registerUser } from "../../services/auth.service";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const handleAlert = () => {
    setOpenAlert((prev) => !prev);
  };

  const register = (e) => {
    e.preventDefault();

    getUserByUsername(form.username)
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          console.log('exists');

          setIsUsernameValid(false);
          setIsSuccessful(false);
        } else {
          setIsUsernameValid(true);
        }

        try {
          console.log('valid', isUsernameValid);
          if (isUsernameValid) {

            const u = await registerUser(form.email, form.password);
            console.log('form', form)
            createUserUsername(
              form.username,
              u.user.uid,
              form.email,
              form.password,
              form.firstName,
              form.lastName,
              form.phone
            )
              .then(() => {
                setIsSuccessful(true);
                handleAlert();
                navigate("/home");
                console.log('then1');
              })
              .catch((error) => {
                setIsSuccessful(false);
                handleAlert();
                console.log('error1', error);
              });
          } else {
            setIsSuccessful(false);
            console.log('then2');
            handleAlert();
          }
        } catch (error) {
          setIsSuccessful(false);
          setIsEmailValid(false);
          handleAlert();
          console.log('error2', error);
        }
      })
      .catch(console.error);

    console.log(e);
    // navigate("/home");
  };

  return (
    <div className="Register">
      <div className="register-section">
        <div className="register-title">Create your account here</div>
        <form className="register-form">
          <div className="section">
            <TextField
              id="firstName"
              type="text"
              label="First name"
              value={form.firstName}
              required
              onChange={updateForm("firstName")}
            />
          </div>
          <div className="section">
            <TextField
              id="lastName"
              type="text"
              label="Last name"
              value={form.lastName}
              required
              onChange={updateForm("lastName")}
            />
          </div>
          <div className="section">
                <TextField
                  variant="outlined"
                  type="text"
                  required
                  value={form.username}
                  onChange={updateForm("username")}
                  label="Username"
                />
              </div>
          <div className="section">
            <TextField
              id="address"
              type="text"
              label="Address"
              value={form.address}
              onChange={updateForm("address")}
            />
          </div>
          <div className="section">
            <TextField
              id="email"
              type="email"
              label="Email"
              value={form.email}
              required
              onChange={updateForm("email")}
            />
          </div>
          <div className="section">
            <TextField
              id="phone"
              type="text"
              label="Phone number"
              value={form.phone}
              required
              onChange={updateForm("phone")}
            />
          </div>
          <div className="section">
            <TextField
              id="password"
              type="password"
              label="Password"
              required
              value={form.password}
              onChange={updateForm("password")}
            />
          </div>

          <div className="register-button">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={register}
              sx={{ width: 150, fontSize: 18, margin: 3, alignSelf: "center" }}
            >
              Register
            </Button>

            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlert}>
              {isSuccessful ? (
                <Alert
                  onClose={handleAlert}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Successfully register!

                </Alert>
              ) : (
                <Alert onClose={handleAlert} severity="error">
                  Please put valid data in fields
                </Alert>
              )}
            </Snackbar>
          </div>
        </form>
      </div>
    </div>
  );
};
