import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const askBot = async () => {
    const res = await axios.post("http://localhost:5000/api/chatbot", { question: query });
    setResponse(res.data.answer);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Ask Our AI Chatbot</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question..." className="border p-2 w-3/4 mb-2" />
      <button onClick={askBot} className="bg-blue-500 text-white p-2 w-1/4">Ask</button>
      <p className="mt-4 bg-gray-100 p-4 rounded shadow">{response}</p>
    </div>
  );
}
export default Chatbot;
