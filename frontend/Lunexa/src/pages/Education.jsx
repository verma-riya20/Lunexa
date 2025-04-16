import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { title: 'Menstrual Health Basics', icon: '💡' },
  { title: 'Myth Busting', icon: '❌' },
  { title: 'Sustainable Alternatives', icon: '♻️' },
  { title: 'Period Care Tips', icon: '❤️' },
  { title: 'PCOS & Health Issues', icon: '🩺' },
  { title: 'Menstrual Hygiene Quiz', icon: '🎯' },
];

const EducationPage = () => {
  return (
    <div className="px-6 py-10 font-sans bg-white">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Learn. Empower. Normalize.
        </h1>
        <p className="text-gray-700 text-lg">
          Lunexa is your one-stop platform for menstrual health education, awareness and community. 
          Learn everything about menstrual hygiene, sustainable products and break the stigma — all in one place.
        </p>
        <button className="mt-6 px-5 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition">
          Let's Explore 🔍
        </button>
      </div>

      {/* Learning Categories */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Explore Our Learning Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
  <Link to={`/education/${cat.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} key={index}>
    <div className="bg-white border rounded-xl shadow hover:shadow-md transition p-6 text-center cursor-pointer">
      <div className="text-4xl mb-2">{cat.icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{cat.title}</h3>
    </div>
  </Link>
))}

        </div>
      </div>

      {/* Learn From Advisors Section */}
      <div className="bg-pink-50 mt-20 p-8 rounded-xl max-w-5xl mx-auto">
        <h3 className="text-xl font-bold text-pink-600 mb-4">Learn From Skilled Advisors</h3>
        <p className="text-gray-700 mb-4">
          Our certified educators and healthcare professionals are here to guide you with expert content, 
          live webinars, and personalized awareness sessions.
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>🌸 Live Sessions with Doctors & Health Educators</li>
          <li>🌸 Gamified Learning Modules</li>
          <li>🌸 Downloadable Menstrual Toolkits</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationPage;
