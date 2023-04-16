import React, { ReactNode } from "react";
import "../styles/authTemplate.scss";

type Prop = {
  children: ReactNode;
};

const AuthTemplate: React.FC<Prop> = ({ children }: Prop) => {
  return <div className="authWrapper">{children}</div>;
};

export default AuthTemplate;
