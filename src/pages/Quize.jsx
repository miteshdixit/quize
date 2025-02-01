import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { FaRegCircleUser } from "react-icons/fa6";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [data, setData] = useState({});
  const [count, setCount] = useState(60);
  const [openHint, setOpenHint] = useState(false);

  const navigate = useNavigate();

  const user = localStorage.getItem("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/Uw5CrX");
        console.log("Data fetched successfully:", response.data);
        console.log("data", Object.values(response.data.questions)[0].topic);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (count > 0 && !openHint) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count, openHint]);

  const handleAnswer = (option) => {
    setSelectedOption(option.description);
    setIsAnswerSelected(true);
    if (option.is_correct) setScore(score + 1);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion <= data.questions_count) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsAnswerSelected(false);
      setCount(60);
      console.log("score:", score);
      console.log("nextQuestion", nextQuestion);

      if (currentQuestion + 1 === data.questions_count) {
        localStorage.setItem("score", score);

        navigate("/results");
      }
    } else {
      setShowScore(true);
    }
  };
  if (count === 0) {
    handleNext();
  }

  // Handle "next" button click

  // Handle "previous" button click
  //   const handlePrevious = () => {
  //     if (currentQuestion > 0) {
  //       setCurrentQuestion(currentQuestion - 1);
  //       setSelectedOption(null);
  //       setIsAnswerSelected(false);
  //     }
  //   };

  useEffect(() => {
    if (data && data.questions) {
      const array = Object.values(data.questions);
      setQuestionsArray(array); // Store converted array in state
      console.log("Data questions:", array);
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 relative h-screen bg-teal-700">
      <div className="absolute top-[35%] right-[-10%]  z-1000 md:right-[23%]">
        <img
          src="Questions-bro.svg"
          alt="starting svg"
          className=" h-[5%] w-[50%] opacity-50 "
        />
      </div>

      <div className="absolute top-5 left-5 flex items-center gap-2 cursor-pointer text-white">
        <FaRegCircleUser className="text-xl" />
        <span>{user}</span>
      </div>

      {/* question number */}
      <div className="text-center text-xl font-bold text-white">
        {currentQuestion + 1}/{data?.questions?.length}
      </div>

      {/* question and timer Section */}
      <div className="text-center">
        <div className="flex flex-col justify-center h-40  p-5 rounded-xl mt-20 mb-15 bg-white  shadow-xl relative">
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

          {/* hint icons */}
          <div
            className="absolute justify-center
          
          items-center mt-2 top-[-23%] right-1"
          >
            <div
              className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
              onClick={() => {
                setOpenHint(true);
              }}
            >
              <FcIdea className="text-xl" />
            </div>
          </div>

          {/* hint content */}
          {openHint && (
            <>
              <div className="fixed inset-0 bg-white opacity-80 backdrop-blur-md  "></div>

              <div className="absolute top-12 left-2 w-80 h-40 bg-white rounded-4xl shadow-3xl p-3 overflow-y-auto z-20 border  ">
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
                <div className="text-sm text-left">
                  {questionsArray[currentQuestion].detailed_solution}
                </div>
              </div>
            </>
          )}

          {/* question box */}
          <div className="overflow-hidden  ">
            <h2
              className="text-lg font-bold break-words text-ellipsis overflow-hidden "
              style={{
                wordWrap: "break-word",
                textAlign: "justify",
                fontSize: "clamp(1rem, 2.5vw, 1rem)",
              }}
            >
              {questionsArray[currentQuestion]?.description}
            </h2>
          </div>
        </div>

        {/* options sections */}
        <div className="mt-4 flex flex-col justify-center items-center ">
          {questionsArray[currentQuestion]?.options?.map((option, index) => (
            <button
              key={index}
              className={`mt-3 px-4 py-2 text-black rounded-3xl w-[95%] shadow-xl text-lg flex items-center justify-between border-[#f6f0b9] border-1
        ${
          isAnswerSelected
            ? option.is_correct
              ? "bg-emerald-500 text-white"
              : selectedOption === option.description
              ? "bg-red-500 text-white"
              : "opacity-50"
            : "bg-[#FFFFFF] text-black"
        }
      `}
              onClick={() => handleAnswer(option)}
              disabled={isAnswerSelected}
            >
              {option.description}

              {isAnswerSelected && option?.is_correct && (
                <span className="flex justify-center items-center w-6 h-6 rounded-full bg-white ml-2">
                  <FaCheckCircle
                    style={{ color: "#004643", border: "#004643" }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Next button */}
        {isAnswerSelected && (
          <button
            onClick={handleNext}
            className="top-4 right-3 flex font-bold items-center cursor-pointer absolute text-[#ddd] text-xl"
          >
            {currentQuestion + 1 === data.questions_count ? "Submit" : "Next"}
            <MdKeyboardArrowRight className="ml-1 text-[#ddd] text-3xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
