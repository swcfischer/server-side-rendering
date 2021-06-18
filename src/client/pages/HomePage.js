import React from "react";

const Home = (props) => {
  return (
    <div
      onClick={() => {
        console.log("hi");
      }}
    >
      Home component
    </div>
  );
};

export default {
  component: Home,
};
