import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import UserProfile from "./UserProfile";

import db from "../firebase";

function Sidebar({ currentUser, signOut }) {
  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setfriendList] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser.email)
        );
      });
    };

    const getFriends = async () => {
      const data = await db
        .collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => setfriendList(snapshot.docs));
    };

    getAllUsers();
    getFriends();

    friendList.map((friend) => (
      <UserProfile
        name={friend.data().fullname}
        photoURL={friend.data().photoURL}
        lastMessage={friend.data().lastMessage}
        email={friend.data().email}
      />
    ));
  }, []);

  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
  });

  const searchItem = searchedUser.map((user) => {
    return (
      <UserProfile
        name={user.data().fullname}
        photoURL={user.data().photoURL}
        key={user.id}
        email={user.data().email}
      />
    );
  });

  console.log(friendList);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-img" onClick={signOut}>
          <img src={currentUser.photoURL} alt="" />
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-input">
          <input
            type="text"
            name="search"
            placeholder="search or start new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar-chat-list">
        <h2>Chats</h2>

        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend) => (
              <UserProfile
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                email={friend.data().email}
              />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;
