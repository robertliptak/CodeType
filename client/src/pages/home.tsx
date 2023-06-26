import React from "react";
import test from "../api/test";

const Home: React.FC = () => {
  const clickHandler = async () => {
    const response = await test();
    console.log(response);
  };

  return (
    <div>
      <h1 className="text-white">Home Page</h1>
      <button type="button" onClick={clickHandler}>
        Check
      </button>
    </div>
  );
};

export default Home;
