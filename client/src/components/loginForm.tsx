import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { loginUser } from "../api/auth";
import PageSpinner from "./pageSpinner";
import { ILoginBackendErrors, ILoginResponse } from "../types/auth";

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const [backendError, setBackendError] = useState<ILoginBackendErrors>({
    email: {
      errorMessage: undefined,
      isError: false,
      inputClassName: undefined,
    },
    password: {
      errorMessage: undefined,
      isError: false,
      inputClassName: undefined,
    },
  });

  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setPageLoading(true);
      const loginResponse: ILoginResponse = await loginUser(loginData);
      const { errorMessage, email, isError, accessToken, user } = loginResponse;

      const emailError = email ? isError : false;
      const passwordError = !email ? isError : false;

      if (isError) {
        setBackendError({
          email: {
            errorMessage: (email && errorMessage) || "",
            isError: emailError,
            inputClassName: emailError ? "is_error" : undefined,
          },
          password: {
            errorMessage: (!email && errorMessage) || "",
            isError: passwordError,
            inputClassName: passwordError ? "is_error" : undefined,
          },
        });
      } else {
        console.log(accessToken, user);
        // navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  const focusHandler = (fieldname: string) => {
    setBackendError((prevState) => ({
      ...prevState,
      [fieldname]: {
        errorMessage: undefined,
        isError: false,
        inputClassName: undefined,
      },
    }));
  };

  const disabledButton = () => {
    return !loginData.email || !loginData.password;
  };

  return (
    <div className="auth_container">
      {pageLoading && <PageSpinner />}
      <div className="component_container">
        <h1>Login</h1>
      </div>
      <div className="component_container mb-6">
        <p>Please enter your details:</p>
      </div>
      <div className="component_container">
        <form>
          <div className="input_container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              id="email"
              value={loginData.email}
              data-tooltip-id="email-tooltip"
              data-tooltip-content={backendError.email.errorMessage as string}
              className={backendError.email.inputClassName}
              onChange={changeHandler}
              onFocus={() => {
                focusHandler("email");
              }}
            />
            {backendError.email.isError && (
              <Tooltip id="email-tooltip" place="right" />
            )}
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
                data-tooltip-id="password-tooltip"
                data-tooltip-content={
                  backendError.password.errorMessage as string
                }
                className={backendError.password.inputClassName}
                onChange={changeHandler}
                onFocus={() => {
                  focusHandler("password");
                }}
              />
              {backendError.password.isError && (
                <Tooltip id="password-tooltip" place="right" />
              )}
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
          onClick={submitHandler}
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
