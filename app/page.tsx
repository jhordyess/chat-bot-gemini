"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { message: "Ask me anything", role: "model" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { message: input, role: "user" };
    setMessages((prev) => [
      ...prev,
      userMessage,
      { message: "Typing...", role: "model" },
    ]);

    setInput("");

    // Simulate API response
    setTimeout(() => {
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages.pop(); // Remove "Typing..."
        updatedMessages.push({
          message: `Response to: ${input}`,
          role: "model",
        });
        return updatedMessages;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <header className="bg-blue-500 text-white text-center py-4">
          <h1 className="text-lg font-bold">Easy Bot</h1>
        </header>
        <div className="flex flex-col p-4 space-y-4 h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center p-4 border-t">
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
