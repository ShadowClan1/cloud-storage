import React from "react";
import Navbar from "../../components/Essentials/Navbar";
import Body from "../../components/Essentials/Body";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen items-center flex flex-col">
        <Body />
      </div>
    </div>
  );
};

export default Home;
