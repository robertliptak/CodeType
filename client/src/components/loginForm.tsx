import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "../api/auth";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <div className="auth_container">
      <h1>Login</h1>
      <p className="my-4">Please enter your details</p>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={loginData.email}
          onChange={changeHandler}
        />
        <input
          type={showPassword ? "password" : "text"}
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={changeHandler}
        />
        <button type="submit" className="filled_button my-6">
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setShowPassword((prevState) => !prevState)}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
        <p>
          Don&apos;t have an account yet?
          <Link className="auth_link" to="/registration">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
