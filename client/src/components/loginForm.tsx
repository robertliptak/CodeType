import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { loginUser } from "../api/auth";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginUser(loginData);
      console.log("User logged in:", user);
    } catch (err) {
      console.error(err);
    }
  };

  const disabledButton = () => {
    return !loginData.email || !loginData.password;
  };

  return (
    <div className="auth_container">
      <div className="component_container">
        <h1>Login</h1>
      </div>
      <div className="component_container mb-6">
        <p>Please enter your details:</p>
      </div>
      <div className="component_container">
        <form onSubmit={submitHandler}>
          <div className="input_container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={changeHandler}
            />
          </div>
          <div className="input_container">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Enter password"
                name="password"
                id="password"
                value={loginData.password}
                onChange={changeHandler}
              />
              <button
                type="button"
                className="show_password"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? (
                  <AiOutlineEye className="show_password_icon" />
                ) : (
                  <AiOutlineEyeInvisible className="show_password_icon" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="component_container mb-2 mt-4"
        data-tooltip-id="button-tooltip"
        data-tooltip-content="Please fill in all required fields"
      >
        <button
          type="submit"
          className="filled_button"
          disabled={disabledButton()}
        >
          Sign in
        </button>
        {disabledButton() && <Tooltip id="button-tooltip" place="right" />}
      </div>
      <div className="component_container">
        <p className="text-center">
          Don&apos;t have an account yet?&nbsp;
          <Link className="auth_link" to="/registration">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
