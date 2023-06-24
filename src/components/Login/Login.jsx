import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/auth.service";
import { getUserData } from "../../services/userData.service";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Checkbox, Form, Input, Modal, Button } from "antd";
import { NavLink } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setUserData } from "../../redux/reducers/userData";

const Login = ({ open, handleClose }) => {
  // use state constants for the the form inputs
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateForm = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const loginToApp = async (e) => {
    e.preventDefault();
    // Sign in an existing user with Firebase
    await loginUser(form.email, form.password)
      .then(async (userAuth) => {
        // store the user's information in the redux state
        console.log("userAuth", userAuth);
        const snapshot = await getUserData(userAuth.user.uid);
        if (snapshot.exists()) {
          console.log(snapshot.val()[Object.keys(snapshot.val())[0]]);

          dispatch(setUserData(snapshot.val()[Object.keys(snapshot.val())[0]]));
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="Login">
      <Modal
        title="Login"
        open={open}
        width={700}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={loginToApp}
          >
            Login
          </Button>,
        ]}
      >
        <div className="login-form-body">
          <Form
            name="basic"
            className="login-form"
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={updateForm("email")}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              onChange={updateForm("password")}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form>
          <div className="login-account-text">
            Don't have an account?
            <NavLink to="/register" onClick={handleClose}>
              {" "}
              Register here!{" "}
            </NavLink>
          </div>
          {/* {loginStatus === API_STATES.REJECTED ? (
            <div className="error-login-mssg">
              Email or password is not valid!
            </div>
          ) : null} */}
        </div>
      </Modal>
    </div>
  );
};

export default Login;
