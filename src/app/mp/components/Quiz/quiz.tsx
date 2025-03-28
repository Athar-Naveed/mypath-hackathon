"use client";

import {useState} from "react";
import quizStore from "@/store/quizStore";

const QuizModal = () => {
  const {quiz, setShowQuiz, totalScore, setTotalScore} = quizStore();
  const [isClosing, setIsClosing] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowQuiz();
    }, 300); // Match this with the transition duration
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      setShowResult(true); // Show result when all questions are answered
      setTotalScore(score); // Update the total score in the store
    }
  };

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
  };

  if (showResult) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div
          className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
            isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Quiz Result</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600">
                You scored {score} out of {quiz.length}!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Question {currentQuestionIndex + 1} of {quiz.length}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-800 font-medium mb-4">{quiz[currentQuestionIndex].question}</p>
            <div className="space-y-3">
              {quiz[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(index)}
                  className={`w-full text-left px-4 py-2 rounded-lg border ${
                    selectedAnswer === index
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex < quiz.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
