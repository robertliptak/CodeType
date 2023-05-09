import React, { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { createUser } from "../api/auth";
import registrationValidationSchema from "../validation/registrationValidation";
import { IRegistration, IRegistrationFormErrors } from "../types/auth";

const RegistrationForm: React.FC = () => {
  const [backendErrorMessage, setBackendErrorMessage] = useState({
    showError: false,
    errorContent: null,
  });

  const formik = useFormik<IRegistration>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validate: (values: IRegistration) => {
      const errors: IRegistrationFormErrors = {};

      if (values.password !== values.confirmedPassword) {
        errors.confirmedPassword = "Passwords do not match";
      }

      return errors;
    },
    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      try {
        const user = await createUser(values);
        setBackendErrorMessage(() => ({
          showError: false,
          errorContent: null,
        }));
        console.log("User created:", user);
      } catch (err: any) {
        const error = err.response.data.message || "Unknown error occurred";
        console.log(error);
        setBackendErrorMessage(() => ({
          showError: true,
          errorContent: error,
        }));
      }
    },
  });

  const getFieldError = (fieldName: keyof IRegistration) => {
    const errorMessage =
      formik.errors[fieldName] && formik.touched[fieldName]
        ? formik.errors[fieldName]
        : null;
    const isError = formik.errors[fieldName] && formik.touched[fieldName];
    const isValid = !formik.errors[fieldName] && formik.touched[fieldName];
    let inputClassName = "";
    if (isError) {
      inputClassName = "is_error";
    } else if (isValid) {
      inputClassName = "is_valid";
    }

    return { errorMessage, inputClassName };
  };

  return (
    <div className="auth_container">
      <h1>Create an account</h1>
      <p className="my-4">Please enter your details</p>
      <form onSubmit={formik.handleSubmit}>
        <p>{getFieldError("username").errorMessage}</p>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className={getFieldError("username").inputClassName}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>{getFieldError("email").errorMessage}</p>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className={getFieldError("email").inputClassName}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>{getFieldError("password").errorMessage}</p>
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={getFieldError("password").inputClassName}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p>{getFieldError("confirmedPassword").errorMessage}</p>
        <input
          type="password"
          placeholder="Verify password"
          name="confirmedPassword"
          className={getFieldError("confirmedPassword").inputClassName}
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <button
          type="submit"
          className="filled_button my-6"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Sign up
        </button>
        {backendErrorMessage.showError && (
          <p>{backendErrorMessage.errorContent}</p>
        )}
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
