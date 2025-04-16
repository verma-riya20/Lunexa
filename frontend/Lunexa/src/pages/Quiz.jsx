import React, { useState } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "How often should you change your pad or tampon?",
      options: ["Once a day", "Every 4-6 hours", "Only when it feels full", "Every 12 hours"],
      answer: "Every 4-6 hours",
    },
    {
      question: "Which of the following is a reusable menstrual product?",
      options: ["Tampon", "Menstrual Cup", "Sanitary Pad", "Panty Liner"],
      answer: "Menstrual Cup",
    },
    {
      question: "Why is it important to maintain menstrual hygiene?",
      options: ["To avoid bad smell", "To prevent infections", "To feel fresh", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "Can you take a bath or shower while on your period?",
      options: ["No, it's unsafe", "Yes, and it's actually good for you", "Only cold showers", "Only if you're using a tampon"],
      answer: "Yes, and it's actually good for you",
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 600);
  };

  return (
    <div className="mt-16 p-15 bg-rose-50 border border-pink-300 rounded-xl shadow-sm">
      <h2 className="text-5xl font-bold text-pink-600 mb-4">🩸 Menstrual Hygiene Quiz</h2>
      {showResult ? (
        <div className="text-center">
          <p className="text-xl font-semibold">🎉 You scored {score} out of {questions.length}</p>
        </div>
      ) : (
        <div>
          <p className="text-3xl font-semibold mb-4">{questions[current].question}</p>
          <div className="space-y-2">
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`block w-full text-xl text-left px-4 py-2 rounded-lg border transition ${
                  selected === option
                    ? option === questions[current].answer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-white hover:bg-pink-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
