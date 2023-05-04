import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { createUser } from "../api/auth";
import registrationValidationSchema from "../validation/registrationValidation";

const RegistrationForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // const [registrationData, setRegistrationData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmedPassword: "",
  // });
  // const [errorMessage, setErrorMessage] = useState({
  //   showError: false,
  //   errorContent: null,
  // });

  // const formik.handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRegistrationData({
  //     ...registrationData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setErrorMessage(() => ({
  //     showError: false,
  //     errorContent: null,
  //   }));

  //   try {
  //     const user = await createUser(registrationData);
  //     console.log("User created:", user);
  //   } catch (err: any) {
  //     const error = err.response.data.message || "Unknown error occurred";
  //     console.log(error);
  //     setErrorMessage(() => ({
  //       showError: true,
  //       errorContent: error,
  //     }));
  //   }
  // };

  return (
    <div className="auth_container">
      <h1>Create an account</h1>
      <p className="my-4">Please enter your details</p>
      <form onSubmit={formik.handleSubmit}>
        <p>
          {formik.errors.username && formik.touched.username
            ? formik.errors.username
            : "Username"}
        </p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="hovno"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : "Email"}
        </p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : "Password"}
        </p>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>
          {formik.errors.confirmedPassword && formik.touched.confirmedPassword
            ? formik.errors.confirmedPassword
            : "Confirmad password"}
        </p>
        <input
          type="password"
          placeholder="Verify password"
          name="confirmedPassword"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button type="submit" className="filled_button my-6">
          Sign up
        </button>
        {/* {errorMessage.showError && <p>{errorMessage.errorContent}</p>} */}
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
