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
      setMessages(prev => [...prev, formattedResponse]);
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col">
      {/* Chat Header */}
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700 bg-primary text-white rounded-t-lg flex justify-between items-center">
        <h3 className="text-lg font-semibold">Bookstore Assistant</h3>
        <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t dark:border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
