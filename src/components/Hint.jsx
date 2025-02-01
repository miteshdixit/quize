import React from "react";
import { FcIdea } from "react-icons/fc";

const Hint = ({ openHint, setOpenHint, detailedSolution }) => {
  return (
    <>
      <div
        className="absolute justify-center items-center mt-2 top-[-23%] right-1"
        onClick={() => setOpenHint(true)}
      >
        <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer">
          <FcIdea className="text-xl" />
        </div>
      </div>

      {openHint && (
        <>
          <div className="fixed inset-0 bg-white opacity-85 backdrop-blur-md "></div>

          <div className="absolute top-12 left-2 w-80 h-40 bg-white rounded-4xl shadow-3xl p-3 overflow-y-scroll z-9990 border  ">
            <button
              onClick={() => setOpenHint(false)}
              className="absolute top-[-2%] right-2 text-2xl font-bold rounded-3xl text-pink-500 hover:text-pink-700 transition-all "
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                cursor: "pointer",
                border: "none",
                background: "none",
              }}
            >
              &times;
            </button>
            <div className="text-sm text-left">{detailedSolution}</div>
          </div>
        </>
      )}
    </>
  );
};

export default Hint;
