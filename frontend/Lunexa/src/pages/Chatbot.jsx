import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const Chatbot = () => {
  const { user, token, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const messagesEndRef = useRef(null);

  // Initialize chat
  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) navigate('/login');
    else initializeChat();
  }, [isAuthenticated, isLoading, token]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/v1/ai/start',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessages([{
        text: response.data.message,
        sender: 'ai',
        options: response.data.options
      }]);
      setProgress(response.data.progress);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (message) => {
    try {
      setLoading(true);
      setMessages(prev => [...prev, { text: message, sender: 'user' }]);

      const response = await axios.post(
        'http://localhost:8000/api/v1/ai/process',
        { answer: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newMessage = {
        text: response.data.message,
        sender: 'ai',
        options: response.data.options,
        products: response.data.products
      };

      setMessages(prev => [...prev, newMessage]);
      setProgress(response.data.progress);
      scrollToBottom();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    console.error(error);
    if (error.response?.status === 401) {
      logout();
      navigate('/login');
    } else {
      setMessages(prev => [...prev, {
        text: "Oops! Something went wrong. Please try again.",
        sender: 'ai'
      }]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-md mx-auto p-4 h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
            <span className="text-lg">🌸</span>
          </div>
          <h1 className="text-xl font-bold text-pink-600">Flo Helper</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-8 rounded-full bg-pink-100 flex items-center justify-center">
            <span className="text-xs font-medium text-pink-600">{progress}% complete</span>
          </div>
          <button 
            onClick={logout}
            className="text-sm text-pink-500 hover:text-pink-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full bg-pink-100 rounded-full h-2 mb-4">
        <motion.div 
          className="bg-pink-500 h-2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-xs p-4 rounded-2xl ${
                msg.sender === 'ai' 
                  ? 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-pink-100' 
                  : 'bg-pink-500 text-white rounded-br-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>

                {/* Options */}
                {msg.options && (
                  <div className="mt-3 space-y-2">
                    {msg.options.map((option, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !loading && handleResponse(option)}
                        className="w-full text-left p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition text-pink-800 text-sm font-medium"
                        disabled={loading}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Products */}
                {msg.products && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm mb-3 text-pink-600">Recommended Products</h4>
                    <div className="space-y-3">
                      {msg.products.map((product, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-3 bg-pink-50 rounded-xl border border-pink-100"
                        >
                          <h5 className="font-medium text-pink-700">{product.name}</h5>
                          <p className="text-xs text-pink-600 mt-1">{product.benefits}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-medium text-pink-500">{product.where}</span>
                            <span className="text-xs font-bold text-pink-600">{product.price}</span>
                          </div>
                          <button className="w-full mt-2 text-xs text-white bg-pink-400 hover:bg-pink-500 px-3 py-1.5 rounded-lg">
                            View Details
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-pink-100">
              <div className="flex space-x-2 items-center">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-pink-400"
                      animate={{ 
                        y: [0, -3, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.2,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-pink-500">Flo is thinking</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.message.value.trim();
          if (input && !loading) {
            handleResponse(input);
            e.target.reset();
          }
        }}
        className="flex gap-2 mt-auto"
      >
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white shadow-sm"
          disabled={loading}
        />
        <motion.button
          type="submit"
          className="p-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition disabled:opacity-50 shadow-md"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </form>
    </div>
  );
};

export default Chatbot;