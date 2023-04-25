import React from "react";
import AuthTemplate from "../templates/authTemplate";
import RegistrationForm from "../components/registrationForm";

const SignUp: React.FC = () => {
  return (
    <AuthTemplate>
      <div>
        <RegistrationForm />
      </div>
    </AuthTemplate>
  );
};

export default SignUp;
