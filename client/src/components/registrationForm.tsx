import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { createUser } from "../api/auth";
import registrationValidationSchema from "../validation/registrationSchema";
import {
  IRegistration,
  IRegistrationFormErrors,
  IRegistrationStates,
} from "../types/auth";
import Spinner from "./spinner";
import fieldBlurHandler from "../controllers/registrationValidations/fieldBlurHandler";
import fieldFocusHandler from "../controllers/registrationValidations/fieldFocusHandler";
import passwordChangeHandler from "../controllers/registrationValidations/passwordChangeHandler";
import PageSpinner from "./pageSpinner";

const RegistrationForm: React.FC = () => {
  const [pageLoading, setPageLoading] = useState(false);

  const [backendErrorMessage, setbackendErrorMessage] = useState({
    showError: false,
    errorContent: null,
  });

  const [validationState, setValidationState] = useState<IRegistrationStates>({
    username: {
      isLoading: false,
      isValid: true,
      isError: false,
      errorMessage: undefined,
      inputClassName: undefined,
    },
    email: {
      isLoading: false,
      isValid: true,
      isError: false,
      errorMessage: undefined,
      inputClassName: undefined,
    },
    password: {
      isValid: true,
      isError: false,
      errorMessage: undefined,
      inputClassName: undefined,
    },
    confirmedPassword: {
      isLoading: false,
      isValid: true,
      isError: false,
      errorMessage: undefined,
      inputClassName: undefined,
    },
  });

  const navigate = useNavigate();

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
        setPageLoading(true);
        const user = await createUser(values);
        setbackendErrorMessage(() => ({
          showError: false,
          errorContent: null,
        }));
        setPageLoading(false);
        navigate("/");
        console.log("User created:", user);
      } catch (err: any) {
        console.log(err);

        const error = err.response.data.message || "Unknown error occurred";
        console.log(error);
        setbackendErrorMessage(() => ({
          showError: true,
          errorContent: error,
        }));
      }
    },
  });

  useEffect(() => {
    const validateAllFields = async () => {
      try {
        await formik.validateForm();
      } catch (errors) {
        console.log("Errors found:", errors);
      }
    };
    validateAllFields();
  }, []);

  const disabledButton = Object.keys(formik.errors).some(
    (fieldName) => formik.errors[fieldName],
  );

  return (
    <div className="auth_container">
      {pageLoading && <PageSpinner />}
      <div className="component_container ">
        <h1>Sign Up</h1>
      </div>
      <div className="component_container mb-6">
        <p>Enter your detail to join CodeType:</p>
      </div>
      <div className="component_container">
        <form onSubmit={formik.handleSubmit}>
          <div className="input_container">
            <label htmlFor="username">
              Username <h2 className="star">*</h2>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                id="username"
                value={formik.values.username}
                data-tooltip-id="username-tooltip"
                data-tooltip-content={validationState.username.errorMessage}
                className={validationState.username.inputClassName}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  fieldBlurHandler("username", formik, setValidationState);
                }}
                onFocus={() => {
                  fieldFocusHandler(
                    "username",
                    validationState,
                    setValidationState,
                  );
                }}
              />
              {validationState.username.isLoading && <Spinner />}
              {validationState.username.isError && (
                <Tooltip id="username-tooltip" place="right" />
              )}
            </div>
          </div>
          <div className="relative input_container">
            <label htmlFor="email">
              Email<h2 className="star">*</h2>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                id="email"
                value={formik.values.email}
                data-tooltip-id="email-tooltip"
                data-tooltip-content={validationState.email.errorMessage}
                className={validationState.email.inputClassName}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  fieldBlurHandler("email", formik, setValidationState);
                }}
                onFocus={() => {
                  fieldFocusHandler(
                    "email",
                    validationState,
                    setValidationState,
                  );
                }}
              />
              {validationState.email.isLoading && <Spinner />}
              {validationState.email.isError && (
                <Tooltip id="email-tooltip" place="right" />
              )}
            </div>
          </div>
          <div className=" input_container">
            <label htmlFor="password">
              Password<h2 className="star">*</h2>
            </label>
            <input
              type="password"
              placeholder="Choose password"
              name="password"
              id="password"
              value={formik.values.password}
              data-tooltip-id="password-tooltip"
              data-tooltip-content={validationState.password.errorMessage}
              className={validationState.password.inputClassName}
              onChange={(e) => {
                formik.handleChange(e);
                passwordChangeHandler(e, formik, setValidationState);
              }}
              onBlur={(e) => {
                formik.handleBlur(e);
                fieldBlurHandler("password", formik, setValidationState);
              }}
              onFocus={() => {
                fieldFocusHandler(
                  "password",
                  validationState,
                  setValidationState,
                );
              }}
            />
            {validationState.password.isError && (
              <Tooltip id="password-tooltip" place="right" />
            )}
          </div>
          <div className=" input_container">
            <label htmlFor="confirmedPassword">
              Verify Password<h2 className="star">*</h2>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Verify your password"
                name="confirmedPassword"
                id="confirmedPassword"
                value={formik.values.confirmedPassword}
                data-tooltip-id="confirmedPassword-tooltip"
                data-tooltip-content={
                  validationState.confirmedPassword.errorMessage
                }
                className={validationState.confirmedPassword.inputClassName}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  fieldBlurHandler(
                    "confirmedPassword",
                    formik,
                    setValidationState,
                  );
                }}
                onFocus={() => {
                  fieldFocusHandler(
                    "confirmedPassword",
                    validationState,
                    setValidationState,
                  );
                }}
              />
              {validationState.confirmedPassword.isLoading && <Spinner />}
              {validationState.confirmedPassword.isError && (
                <Tooltip id="confirmedPassword-tooltip" place="right" />
              )}
            </div>
          </div>
        </form>
      </div>
      <div
        className="component_container mb-2 mt-4"
        data-tooltip-id="button-tooltip"
        data-tooltip-content="Please fill in all required fields correctly"
      >
        <button
          type="submit"
          className="filled_button"
          onClick={formik.submitForm}
          disabled={disabledButton}
        >
          Sign Up
        </button>
        {disabledButton && <Tooltip id="button-tooltip" place="right" />}
      </div>
      <div className="component_container">
        <p className="text-center">
          Already have an account?&nbsp;
          <Link className="auth_link" to="/login">
            Log in
          </Link>
        </p>
      </div>
      <div className="component_container mt-3">
        {backendErrorMessage.showError && (
          <div className="backend_error">
            <p className="backend_error_message">
              {backendErrorMessage.errorContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
