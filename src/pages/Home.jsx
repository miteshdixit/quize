import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("name", userName);
    navigate("/quiz");
  };

  return (
    <div
      className="flex flex-col justify-between items-center h-screen w-full text-center p-8"
      style={{ backgroundColor: "#3A6E73" }}
    >
      <div className="bg-white h-36 w-36 rounded-full mt-20  shadow-2xl flex justify-center items-center">
        <h1 className="text-[#004643] font-[Pacifico] text-4xl">Quize</h1>
      </div>

      <div className="w-full max-w-sm">
        <form>
          <label className="block text-m font-bold  text-white mb-2 text-left">
            Enter your name:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-white rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Your Name"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </form>
      </div>

      {/* Start Quiz Button */}
      <div className="mt-8 w-full">
        <button
          className="w-full max-w-sm  py-2 px-4 rounded-2xl text-xl text-white hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: "#F8C660" }}
          type="submit"
          onClick={(e) => {
            // window.location.href = "/quiz";
            handleSubmit(e);
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
