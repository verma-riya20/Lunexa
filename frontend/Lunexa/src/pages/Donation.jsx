import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiHeart, FiGift, FiUsers, FiCheckCircle, FiInfo } from "react-icons/fi";

const Donation = () => {
  const [donationAmount, setDonationAmount] = useState(500);
  const [selectedProduct, setSelectedProduct] = useState("pads");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDistributionInfo, setShowDistributionInfo] = useState(false);
  const controls = useAnimation();

  const products = [
    { id: "pads", name: "Sanitary Pads", icon: "🩹", color: "bg-pink-100" },
    { id: "tampons", name: "Tampons", icon: "🧻", color: "bg-purple-100" },
    { id: "cups", name: "Menstrual Cups", icon: "🥤", color: "bg-blue-100" },
    { id: "kits", name: "Hygiene Kits", icon: "🧴", color: "bg-teal-100" },
  ];

  const impactStats = [
    { value: "1 in 5", label: "girls miss school monthly", icon: <FiUsers className="text-3xl" /> },
    { value: "23M", label: "women in India lack access", icon: <FiHeart className="text-3xl" /> },
    { value: "65%", label: "can't afford products", icon: <FiGift className="text-3xl" /> },
  ];

  const distributionPartners = [
    { name: "Goonj", logo: "🌱", description: "Works in rural areas across 23 states" },
    { name: "Ujaas", logo: "🦋", description: "Focuses on adolescent girls' education" },
    { name: "SHE Teams", logo: "👩‍⚕️", description: "Urban slum outreach programs" },
  ];

  const handleDonate = (e) => {
    e.preventDefault();
    controls.start({ 
      scale: [1, 1.1, 1],
      boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 5px 15px rgba(236,72,153,0.5)", "0 0 0 rgba(0,0,0,0)"],
      transition: { duration: 0.5 }
    });
    setTimeout(() => setIsSubmitted(true), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Floating Blob Backgrounds */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="fixed -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full opacity-20 blur-3xl -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="fixed -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl -z-10"
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-6 text-center"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 -z-10"></div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            Periods With Pride
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Not Shame
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10"
        >
          Every ₹100 provides <span className="font-bold text-pink-600">a month's supply</span> of menstrual products to those in need.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block relative group"
        >
          <button className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Start Donating</span>
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                👆
              </motion.span>
            </span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white opacity-20 rounded-full"
            />
          </button>
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
        </motion.div>
      </motion.section>

      {/* Impact Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
        viewport={{ once: true }}
      >
        {impactStats.map((stat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}
            className={`relative bg-white p-8 rounded-3xl shadow-md border-b-4 ${
              i === 0 ? "border-pink-500" : i === 1 ? "border-purple-500" : "border-blue-500"
            } transition-all duration-300`}
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-pink-600">
              {stat.icon}
            </div>
            <h3 className="text-4xl font-bold mb-2 text-center mt-6">{stat.value}</h3>
            <p className="text-gray-600 text-center">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Distribution Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-6 md:mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mb-28"
      >
        <div 
          className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white cursor-pointer"
          onClick={() => setShowDistributionInfo(!showDistributionInfo)}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FiInfo className="text-2xl" />
              How Your Donation Reaches Those in Need
            </h2>
            <motion.div
              animate={{ rotate: showDistributionInfo ? 180 : 0 }}
              className="text-2xl"
            >
              ▼
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showDistributionInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {distributionPartners.map((partner, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-50 p-6 rounded-xl text-center"
                    >
                      <div className="text-4xl mb-3">{partner.logo}</div>
                      <h3 className="text-xl font-bold mb-2 text-pink-600">{partner.name}</h3>
                      <p className="text-gray-600">{partner.description}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
                  <h4 className="font-bold text-pink-700 mb-2">Our Process:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Donations are collected and converted to products</li>
                    <li>Partner NGOs place orders based on community needs</li>
                    <li>Products distributed through schools, clinics, and women's groups</li>
                    <li>Monthly impact reports shared with donors</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Donation Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-6 md:mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mb-28"
      >
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 text-white relative overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-white opacity-10 rounded-full"
          />
          <h2 className="text-3xl font-bold relative z-10">Make Your Impact</h2>
          <p className="relative z-10">Select products & amount below</p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 0.8 }}
              className="text-6xl mb-6 text-pink-500"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
            <p className="text-gray-600 mb-6">
              Your donation of <span className="font-bold text-pink-600">₹{donationAmount}</span> will provide{" "}
              <span className="font-bold">{products.find(p => p.id === selectedProduct).name}</span> to those in need.
            </p>
            <div className="bg-pink-50 p-4 rounded-lg mb-6">
              <h4 className="font-bold text-pink-700 mb-2">What happens next?</h4>
              <p className="text-sm text-gray-600">
                You'll receive an email confirmation with tracking details of your donation's impact within 24 hours.
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium py-3 px-8 rounded-full transition-all"
            >
              Donate Again
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleDonate} className="p-8">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What will you donate?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <motion.button
                    key={product.id}
                    type="button"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProduct(product.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedProduct === product.id
                        ? "border-pink-500 bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300"
                    } ${product.color}`}
                  >
                    <div className="text-3xl mb-2">{product.icon}</div>
                    <div className="font-medium">{product.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Donation Amount (₹)</h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[200, 500, 1000, 2000].map((amount) => (
                  <motion.button
                    key={amount}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDonationAmount(amount)}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      donationAmount === amount
                        ? "bg-pink-600 text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    ₹{amount}
                  </motion.button>
                ))}
              </div>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative bg-gray-50 rounded-lg p-1"
              >
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  min="100"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Math.max(100, parseInt(e.target.value) || 100))}
                  className="w-full pl-10 pr-4 py-3 bg-transparent focus:outline-none font-medium"
                />
              </motion.div>
              <p className="text-sm text-gray-500 mt-2">
                ₹100 = 1 month's supply for one person
              </p>
            </div>

            <motion.button
              type="submit"
              animate={controls}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Donate ₹{donationAmount}</span>
              <motion.span
                animate={{ x: [0, 5, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
            </motion.button>
          </form>
        )}
      </motion.div>

      {/* Final CTA */}
      <div className=" h-20% relative py-20 px-6 text-center bg-gradient-to-br from-pink-500 to-purple-300 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 bg-radial-gradient from-white opacity-10 -z-10"
        />
        
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Be the Change
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl mb-10 max-w-2xl mx-auto"
        >
          Join 15,000+ donors creating menstrual equity across India.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <button className="bg-white text-pink-600 hover:bg-gray-100 font-bold py-4 px-12 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2">
            <span>Thank You for Contribution</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ✨
            </motion.span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full">
            <div className="flex -space-x-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-10 h-10 rounded-full bg-white border-2 border-pink-300 shadow-md"
                />
              ))}
            </div>
            <div>
              <p className="font-medium">Join our community of changemakers</p>
              <p className="text-sm opacity-80">1 donation every 8 minutes</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Donation;