import React from "react";
import AuthTemplate from "../templates/authTemplate";
import RegisterForm from "../components/registerForm";

const Register: React.FC = () => {
  return (
    <AuthTemplate>
      <div>
        <RegisterForm />
      </div>
    </AuthTemplate>
  );
};

export default Register;
