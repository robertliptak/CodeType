import React from "react";
import AuthTemplate from "../templates/authTemplate";
import LoginForm from "../components/loginForm";

const Login: React.FC = () => {
  return (
    <AuthTemplate>
      <div>
        <LoginForm />
      </div>
    </AuthTemplate>
  );
};

export default Login;
