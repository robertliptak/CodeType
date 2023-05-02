import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../api/auth";

const RegistrationForm: React.FC = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    showError: false,
    errorContent: null,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage(() => ({
      showError: false,
      errorContent: null,
    }));

    try {
      const user = await createUser(registrationData);
      console.log("User created:", user);
    } catch (err: any) {
      const error = err.response.data.message || "Unknown error occurred";
      console.log(error);
      setErrorMessage(() => ({
        showError: true,
        errorContent: error,
      }));
    }
  };

  return (
    <div className="auth_container">
      <h1>Create an account</h1>
      <p className="my-4">Please enter your details</p>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="hovno"
          value={registrationData.username}
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={registrationData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={registrationData.password}
          onChange={changeHandler}
        />
        <input
          type="password"
          placeholder="Verify password"
          name="confirmedPassword"
          value={registrationData.confirmedPassword}
          onChange={changeHandler}
        />
        <button type="submit" className="filled_button my-6">
          Sign up
        </button>
        {errorMessage.showError && <p>{errorMessage.errorContent}</p>}
        <p>
          Already have an account?{" "}
          <Link className="auth_link" to="/login">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
