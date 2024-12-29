import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthProvider";

const ChatInterface = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const { token } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    startNewSession();
    scrollToBottom();
  }, []);

  const startNewSession = async () => {
    try {
      const response = await fetch(
        "https://bookstoreapp-master.onrender.com/api/chat/session/start",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setSessionId(data.session._id);
    } catch (error) {
      console.error("Error starting chat session:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { content: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch(
        "https://bookstoreapp-master.onrender.com/api/chat/message",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            content: input,
          }),
        }
      );
      const data = await response.json();
      const formattedResponse = {
        content: data.message
          .split("\n")
          .map((line) => line.trim())
          .join("\n"),
        sender: "bot",
      };
      setMessages((prev) => [...prev, formattedResponse]);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[95%] md:w-[450px] lg:w-[400px] h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out">
      {/* Modern Header */}
      <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-primary to-primary/80 text-white rounded-t-2xl flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
          <h3 className="text-lg font-semibold">Bookstore AI Assistant</h3>
        </div>
        <button 
          onClick={onClose} 
          className="hover:bg-white/20 p-2 rounded-full transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Enhanced Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-primary to-primary/90 text-white rounded-tr-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none"
              } transform transition-all duration-200 hover:scale-[1.02]`}
              style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Modern Input Form */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl"
      >
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about books..."
            className="input input-bordered w-full bg-white dark:bg-gray-700 rounded-full px-4 py-2 focus:ring-2 focus:ring-primary/50 transition-all duration-200"
          />
          <button 
            type="submit" 
            className="btn btn-primary rounded-full px-6 hover:scale-105 transition-transform duration-200 flex items-center gap-2"
          >
            <span>Send</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;