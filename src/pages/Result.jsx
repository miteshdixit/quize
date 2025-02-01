import React from "react";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const score = localStorage.getItem("score") || 0;
  const player_name = localStorage.getItem("name") || "Player";
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full text-center p-8 relative"
      style={{
        background: "linear-gradient(135deg, #3A6E73, #004643)",
      }}
    >
      <div className="absolute top-[5%] right-[-10%]  z-1000 md:right-[23%] md:top-[18%]">
        <img
          src="result.svg"
          alt="starting svg"
          className=" h-[5%] w-[50%] opacity-100 "
        />
      </div>

      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-[#004643]">🎉 Results 🎉</h1>
        <h2 className="text-2xl font-semibold text-[#3A6E73] mt-2">
          Well done, {player_name}!
        </h2>

        <div className="mt-4 bg-[#F8C660] text-white text-2xl font-bold py-4 px-6 rounded-xl shadow-lg">
          Your Score: {score}
        </div>

        <p className="mt-4 text-gray-600 text-lg">
          {score >= 8
            ? "🔥 Excellent! You're a quiz master!"
            : score >= 5
            ? "😃 Great job! Keep improving!"
            : "💡 Keep learning! You'll do better next time!"}
        </p>

        <button
          className="mt-6 bg-[#3A6E73] text-white py-2 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#004643] transition-all"
          onClick={() => navigate("/")}
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;
