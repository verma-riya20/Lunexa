// src/pages/Education.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
    { id: 1, title: "Welcome to Menstruation Education", content: "Menstruation is a natural biological process. Let's learn everything about it step by step." },
    { id: 2, title: "Understanding Your Cycle", content: "The menstrual cycle typically lasts around 28 days, but it can vary. Tracking your cycle can help you understand your body better." },
    { id: 3, title: "Common Myths & Facts", content: "Many myths exist around menstruation, such as not being able to exercise. In reality, staying active can help relieve cramps." },
    { id: 4, title: "Choosing the Right Products", content: "There are many menstrual products like pads, tampons, and menstrual cups. We will help you choose the best fit for you!" },
    { id: 5, title: "Menstrual Hygiene", content: "Maintaining good hygiene during menstruation is crucial. Change your products regularly and stay clean." },
    { id: 6, title: "FAQs & Myths", content: "Learn about common FAQs and bust the biggest myths about menstruation." },
    { id: 7, title: "Quiz & Recommendations", content: "Let's test your knowledge with a quick quiz and recommend the best products based on your lifestyle." },
];

export const EducationTour = () => {
    const [stepIndex, setStepIndex] = useState(0);
    const navigate = useNavigate();
    
    const nextStep = () => {
        if (stepIndex < steps.length - 1) {
            setStepIndex(stepIndex + 1);
        } else {
            navigate("/education/quiz");
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-pink-100 to-pink-300 min-h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-3xl font-bold text-pink-700 mb-4">{steps[stepIndex].title}</h1>
            <p className="text-lg text-gray-800 max-w-xl mb-6">{steps[stepIndex].content}</p>
            <button onClick={nextStep} className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600">
                {stepIndex < steps.length - 1 ? "Next" : "Take the Quiz"}
            </button>
        </div>
    );
};

export const FAQAndMyths = () => (
    <div className="p-8 bg-white rounded-lg shadow-lg mx-4 my-6 text-center">
        <h2 className="text-3xl font-bold text-pink-700">FAQs & Myth Busting</h2>
        <p className="text-gray-700 mt-4">Here are answers to common questions and myths about menstruation.</p>
        <ul className="list-disc pl-6 text-gray-700 mt-4 text-left">
            <li><strong>Myth:</strong> You can't exercise during periods. <br/><strong>Fact:</strong> Exercise can actually help reduce cramps and improve mood.</li>
            <li><strong>Myth:</strong> You should not take a bath during menstruation. <br/><strong>Fact:</strong> Bathing helps in hygiene and relaxation.</li>
            <li><strong>FAQ:</strong> How often should I change my pad or tampon? <br/><strong>Answer:</strong> It is recommended to change every 4-6 hours to prevent infections.</li>
            <li><strong>FAQ:</strong> Are menstrual cups safe? <br/><strong>Answer:</strong> Yes, they are safe, reusable, and eco-friendly.</li>
        </ul>
    </div>
);

export const Quiz = () => {
    const [answer, setAnswer] = useState(null);
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        if (answer) {
            navigate("/education/products");
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg mx-4 my-6 text-center">
            <h2 className="text-3xl font-bold text-pink-700">Menstruation Quiz</h2>
            <p className="text-gray-700 mt-4">What product do you prefer the most?</p>
            <div className="mt-4">
                <button onClick={() => setAnswer("pads")} className="px-4 py-2 bg-pink-500 text-white rounded-lg mr-2">Pads</button>
                <button onClick={() => setAnswer("tampons")} className="px-4 py-2 bg-pink-500 text-white rounded-lg mr-2">Tampons</button>
                <button onClick={() => setAnswer("cups")} className="px-4 py-2 bg-pink-500 text-white rounded-lg">Menstrual Cups</button>
            </div>
            <button onClick={handleSubmit} disabled={!answer} className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600">
                Get Product Recommendation
            </button>
        </div>
    );
};
