// AI assistant chat box (simulated AI using our dataset)
import { useState } from "react"; // hook for state
import chatData from "../data/chatData.js"; // questions and answers
import "./ChatBot.css"; // chat styles

// props: orders (to answer "what did I order"), user (who is logged in)
function ChatBot({ orders, user }) {
  const [open, setOpen] = useState(false); // is the chat window open?
  const [input, setInput] = useState(""); // what the user is typing
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Hussaini's AI helper 🤖 Ask me anything about our food." }, // first message
  ]);

  // find the best answer for a question
  function getAnswer(question) {
    const text = question.toLowerCase(); // make it lowercase so matching is easy

    // special case: use the real last order if the user has one
    if (text.includes("last time") || text.includes("previous") || text.includes("ordered")) {
      const myOrders = orders.filter((o) => user && o.customer === user.email); // this user's orders
      if (myOrders.length > 0) {
        const names = myOrders[0].items.map((i) => i.name).join(" and "); // item names
        return "Your previous order was " + names + "."; // real answer
      }
    }

    // look for a dataset item whose keywords are in the question
    const match = chatData.find((d) => d.keywords.some((k) => text.includes(k)));

    // return the answer, or a default reply
    return match ? match.answer : "Sorry, I don't know that yet. Try one of the questions below!";
  }

  // send a message
  function send(text) {
    if (text.trim() === "") return; // ignore empty messages
    const userMsg = { from: "user", text: text }; // the user's message
    const botMsg = { from: "bot", text: getAnswer(text) }; // the AI reply
    setMessages([...messages, userMsg, botMsg]); // add both to the chat
    setInput(""); // clear the input box
  }

  // form submit (press Enter or click Send)
  function handleSubmit(e) {
    e.preventDefault(); // stop page from reloading
    send(input); // send what was typed
  }

  return (
    <>
      {/* round button at the bottom right */}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "✕" : "💬"}
      </button>

      {/* chat window only shows when open (conditional rendering) */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">Hussaini's AI Assistant</div>

          {/* all messages, list rendering */}
          <div className="chat-messages">
            {messages.map((m, index) => (
              <div key={index} className={m.from === "bot" ? "msg bot" : "msg user"}>
                {m.text}
              </div>
            ))}
          </div>

          {/* quick question buttons from the dataset */}
          <div className="chat-quick">
            {chatData.map((d) => (
              <button key={d.question} onClick={() => send(d.question)}>
                {d.question}
              </button>
            ))}
          </div>

          {/* type your own question */}
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              value={input} // controlled input
              onChange={(e) => setInput(e.target.value)} // update state when typing
              placeholder="Type a question..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}

// share ChatBot with App.jsx
export default ChatBot;
