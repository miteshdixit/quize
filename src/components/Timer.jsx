import React from "react";

const Timer = ({ count }) => {
  return (
    <div
      className="absolute rounded-full h-18 w-18 p-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[-5%] bg-orange-50 flex items-center justify-center"
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: `radial-gradient(closest-side, white 80%, transparent 80% 100%), conic-gradient(hotpink ${
          (count / 60) * 100
        }%, pink 0)`,
      }}
    >
      <div className="text-black text-3xl font-bold">{count}</div>
    </div>
  );
};

export default Timer;
