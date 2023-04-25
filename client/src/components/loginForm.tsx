import React, { useState } from "react";
import { loginUser } from "../api/auth";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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
    <div>
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
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={changeHandler}
        />
        <button type="submit" className="filled_button my-6">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
