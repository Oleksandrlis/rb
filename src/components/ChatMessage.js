import React from "react";
import "./ChatMessage.css";
import { auth } from "../firebase";

function ChatMessage({ message, time, sender, answer }) {
  return (
    <>
      <div
        className="chat-message"
        style={{
          alignSelf:
            sender === auth.currentUser.email ? "flex-end" : "flex-start",
          backgroundColor:
            sender === auth.currentUser.email ? "#E0E0E0" : "#BC8F8F",

          color: sender === auth.currentUser.email ? "#686868" : "blue",
        }}
      >
        <div className="chat-message-text">
          <p>{message}</p>
        </div>
      </div>
      <div className="chat-message-date">
        <p>{new Date(time.toDate()).toLocaleString()}</p>
      </div>

      <div className="chat-message-text">
        <p
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#3C4252",
            display: "inline-block",
            color: "#fff",
            borderRadius: "50px",
            margin: "30px 30px 10px 30px",
            padding: "10px"
          }}
        >
          {answer}
        </p>
        <div className="chat-message-date">
          <p>{new Date(time.toDate()).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
