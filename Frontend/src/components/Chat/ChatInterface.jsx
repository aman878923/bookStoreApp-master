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

  // Add useEffect to scroll on messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-[95%] md:w-[450px] lg:w-[400px] h-[600px] bg-white/90 dark:bg-gray-900/95 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
      {/* Modern Header */}
      <div className="p-6 border-b dark:border-gray-800/50 bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-t-3xl flex justify-between items-center backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50 ring-4 ring-emerald-400/20"></div>
          <h3 className="text-xl font-bold tracking-tight">
            Bookstore AI Assistant
          </h3>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:rotate-90 hover:scale-110"
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
      <div className="flex-1 p-6 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 space-y-8">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-5 rounded-2xl shadow-xl ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-tr-none"
                  : "bg-white/80 dark:bg-gray-800/90 text-gray-800 dark:text-white rounded-tl-none border border-gray-100/20 dark:border-gray-700/50"
              } transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl backdrop-blur-sm`}
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
        className="p-6 border-t dark:border-gray-800/50 bg-gray-50/90 dark:bg-gray-900/90 rounded-b-3xl backdrop-blur-xl"
      >
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about books..."
            className="input w-full bg-white/80 dark:bg-gray-800/80 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 focus:outline-none text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 backdrop-blur-sm"
          />
          <button
            type="submit"
            className="btn bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-2xl px-6 py-3 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-medium text-base">Send</span>
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
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
