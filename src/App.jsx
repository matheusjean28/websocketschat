import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import AppContext from "./Context/AppContext";
import ChatRooms from "./Components/ChatRooms";
import RenderAllMessages from "./Components/RenderAllMessages";
import Login from "./Components/Login";
import ProfileSettings from "./Components/ProfileSettings";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [connection, setConnection] = useState(null);
  const [recivedMessages, setRecivedMessages] = useState([]);
  const [login, setLogin] = useState({
    name: String,
    email: String,
    password: String,
  });
  const [isLoged, setIsLoged] = useState(false);
  const [isInARoom, setIsInARoom] = useState(false)
  const [chatName, setChatName] = useState("Animals")
  const [userInfo, setUserInfo] = useState({
    userName: username,
    picProfile: "src/assets/editar.png ",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  })
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5178/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log("Conectado ao hub!");
      })
      .catch((error) => {
        console.error("Erro ao conectar ao hub:", error);
      });

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [setConnection, isLoged, isInARoom]);

  return (
    <AppContext.Provider
      value={{
        isEditing, setIsEditing,
        userInfo, setUserInfo,
        chatName, setChatName,
        isInARoom, setIsInARoom,
        isLoged,
        setIsLoged,
        login,
        setLogin,
        connection,
        setConnection,
        username,
        setUsername,
        recivedMessages,
        setRecivedMessages,
      }}
    >
      {/* <div className="MainGrid">
            <h2 className="MainGridChatName">{chatName}</h2>
            <RenderAllMessages />
            <Profile />
          </div> */}
      {isLoged ? (
        isInARoom ? (
          <div className="MainGrid">
            <h2 className="MainGridChatName">{chatName}</h2>

            <RenderAllMessages />
            <ProfileSettings />
          </div>
        ) : (

          <ChatRooms />
        )
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}

export default App;
