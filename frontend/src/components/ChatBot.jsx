import { useState } from "react";
import chatData from "../data/chatData.js";
import "./ChatBot.css";

export default function ChatBot({ orders, user }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Hussaini's AI helper 🤖 Ask me anything about our food." },
  ]);

  // Find the best answer for a user question
  const getAnswer = (question) => {
    const text = question.toLowerCase();

    // Check if they are asking about their previous order
    if (text.includes("last time") || text.includes("previous") || text.includes("ordered")) {
      const myOrders = orders.filter((o) => user && o.customer === user.email);
      if (myOrders.length > 0) {
        const names = myOrders[0].items.map((i) => i.name).join(" and ");
        return `Your previous order was ${names}.`;
      }
    }

    // Match question keywords with the dataset
    const match = chatData.find((d) => d.keywords.some((k) => text.includes(k)));
    return match ? match.answer : "Sorry, I don't know that yet. Try one of the questions below!";
  };

  // Send user message and get bot response
  const send = (text) => {
    if (!text.trim()) return;
    
    const userMsg = { from: "user", text };
    const botMsg = { from: "bot", text: getAnswer(text) };
    
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Toggle Button */}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Box Window */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">Hussaini's AI Assistant</div>

          {/* Messages Stream */}
          <div className="chat-messages">
            {messages.map((m, index) => (
              <div key={index} className={`msg ${m.from}`}>
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Question Buttons */}
          <div className="chat-quick">
            {chatData.map((d) => (
              <button key={d.question} onClick={() => send(d.question)}>
                {d.question}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}