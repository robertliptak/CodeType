import React, { useState } from "react";
import createUser from "../api/auth";

const RegisterForm: React.FC = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await createUser(registerData);
      console.log("User created:", user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Create an account</h1>
      <p className="my-4">Please enter your details</p>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={registerData.username}
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={registerData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={registerData.password}
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Verify password"
          name="confirmedPassword"
          value={registerData.confirmedPassword}
          onChange={changeHandler}
        />
        <button type="submit" className="filled_button my-6">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
