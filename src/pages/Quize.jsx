import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { FaRegCircleUser } from "react-icons/fa6";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hint from "../components/Hint";
import Timer from "../components/Timer";

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
  //   const apiUrl =
  //     import.meta.env.MODE === "development"
  //       ? "/api"
  //       : import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        console.log("Data fetched successfully:", response.data);
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

  //   array of questions
  useEffect(() => {
    if (data && data.questions) {
      const array = Object.values(data.questions);
      setQuestionsArray(array);
      console.log("Data questions:", array);
    }
  }, [data]);

  //   loading
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 relative h-screen bg-teal-700 z-10">
      {/* illustrations */}
      <div className="absolute top-0 left-0 w-screen h-screen">
        <img
          src="zig-zag.svg"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="absolute top-[25%] right-[-10%]  z-1000 md:right-[23%]">
        <img
          src="Questions-bro.svg"
          alt="starting svg"
          className=" h-[5%] w-[50%] opacity-40 "
        />
      </div>

      <div className="absolute top-5 left-5 flex items-center gap-2 cursor-pointer text-white">
        <FaRegCircleUser className="text-xl" />
        <span>{user}</span>
      </div>

      {/* question number */}
      <div className="text-center text-xl font-bold text-white z-[10]">
        {currentQuestion + 1}/{data?.questions?.length}
      </div>

      {/* question and timer Section */}
      <div className="text-center z-10">
        <div className="flex flex-col justify-center h-40  p-5 rounded-xl mt-20 mb-15 bg-white  shadow-xl relative">
          {/* Timer */}
          <Timer count={count} />

          <div className="overflow-y-scroll z-20 text-center  justify-center">
            <Hint
              openHint={openHint}
              setOpenHint={setOpenHint}
              detailedSolution={
                questionsArray[currentQuestion]?.detailed_solution
              }
            />
          </div>

          {/* question box */}
          <div className="overflow-hidden  ">
            <h2
              className="text-lg font-bold break-words text-ellipsis overflow-hidden  "
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
        <div className="mt-4 flex flex-col justify-center items-center z-10 ">
          {questionsArray[currentQuestion]?.options?.map((option, index) => (
            <button
              key={index}
              className={`mt-3 px-4 py-2 text-black rounded-3xl w-[95%] shadow-xl text-lg flex items-center justify-between border-[#f6f0b9] border-1 z-10
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
            className="bottom-6 right-3 flex font-bold items-center cursor-pointer absolute text-[#ddd] text-xl z-10"
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
