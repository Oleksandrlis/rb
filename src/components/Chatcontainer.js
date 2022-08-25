import React, { useEffect, useRef, useState } from "react";
import "./Chatcontainer.css";
import ChatMessage from "./ChatMessage";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase/compat/app";
import axios from "axios";

function Chatcontainer({ currentUser }) {
  const [message, setMessage] = useState("");
  const { emailID } = useParams();
  const [chatUser, setchatUser] = useState({});
  const [chatMessages, setchatMessages] = useState([]);
  const chatBox = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("users")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setchatUser(snapshot.data());
        });
    };

    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());

          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.receiverEmail === (currentUser.email || emailID)
          );

          setchatMessages(newMessage);
        });
    };

    getUser();
    getMessages();
  }, [emailID]);

  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);

  const send = async (e) => {
    e.preventDefault();

    const answer = await axios
      .get("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        return response.data.value;
      });

    if (emailID) {
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),
        answer: answer,
      };

      //sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(payload);

      //reciver
      db.collection("chats").doc(emailID).collection("messages").add(payload);

      db.collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });

      db.collection("FriendList")
        .doc(emailID)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });

      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={chatUser.photoURL} alt="" />
          </div>
          <p>{chatUser.fullname}</p>
        </div>
        <div className="chat-container-header-btn">{/* //icons */}</div>
      </div>
      <div className="chat-display-container" ref={chatBox}>
        {chatMessages.map((message) => (
          <ChatMessage
            message={message.text}
            time={message.timeStamp}
            sender={message.senderEmail}
            answer={message.answer}
          />
        ))}
      </div>
      <div className="chat-input">
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="chat-input-send-btn" onClick={send}>
        </div>
      </div>
    </div>
  );
}

export default Chatcontainer;
