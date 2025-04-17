import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Navigation with unique style */}
      

      {/* Hero Section with creative design */}
      <section className="relative py-32 px-6">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-pink-100 opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100 opacity-20"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-100 opacity-15"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="relative inline-block">
                <span className="relative z-10">Your Period Doesn't Define You,</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-pink-200 opacity-60 z-0"></span>
              </span>
              <br />
              <span className="text-pink-600">But We Can Help You Manage It</span>
            </h1>
            
            <p className="text-xl mb-10 text-gray-600 leading-relaxed">
              Breaking taboos one cycle at a time. We provide solutions, education, and support 
              for all your menstrual health needs.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Discover Solutions
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section with creative stats */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome To Femine
            </h2>
            <p className="text-xl text-center max-w-4xl mx-auto text-gray-600">
              A safe space for all menstruators to find support, products, and community. 
              We're changing the conversation around periods, one cycle at a time.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: "32", title: "Organic Products", desc: "Chemical-free solutions" },
              { number: "82", title: "Expert Articles", desc: "From gynecologists" },
              { number: "28", title: "Pain Relief Methods", desc: "Tested & approved" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center p-8 rounded-xl bg-gradient-to-b from-white to-pink-50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-6xl font-bold text-pink-600 mb-4">{item.number}</div>
                <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transform Section with creative cards */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl font-bold mb-16 text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We Can Help Transform Your Experience
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "Pain Management", 
                desc: "Natural remedies for menstrual cramps",
                icon: "💊"
              },
              { 
                title: "Product Guidance", 
                desc: "Find your perfect menstrual product",
                icon: "🩸"
              },
              { 
                title: "Cycle Tracking", 
                desc: "Understand your body's rhythm",
                icon: "📅"
              },
              { 
                title: "Emotional Support", 
                desc: "Navigate PMS with confidence",
                icon: "💖"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                <a href="#" className="text-pink-600 font-medium flex items-center group">
                  Learn More
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section with creative layout */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                Proving Our Expertise
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Our team of gynecologists, health experts, and menstruators have created 
                the most comprehensive resource for menstrual health. We combine medical 
                expertise with real-life experience to bring you trustworthy information.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium shadow-md"
                >
                  Explore Resources
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-pink-600 text-pink-600 px-8 py-3 rounded-full font-medium"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative">
                {/* Creative overlapping elements */}
                <div className="w-full h-80 bg-pink-100 rounded-2xl shadow-lg"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-100 rounded-2xl shadow-lg"></div>
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-yellow-100 rounded-xl shadow-md"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;