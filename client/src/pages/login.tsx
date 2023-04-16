import React from "react";
import AuthTemplate from "../templates/authTemplate";

const Login: React.FC = () => {
  return (
    <AuthTemplate>
      <div>
        <h1 className="text-main-white">Hello from Login!</h1>
        <p className="text-main-white">Hello from Login!</p>
        <input type="text" />
        <button type="submit">Submit</button>
      </div>
    </AuthTemplate>
  );
};

export default Login;
