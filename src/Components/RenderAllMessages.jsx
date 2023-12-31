import React, { useContext, useState, useEffect } from "react";
import ChatMain from "./ChatMain";
import AppContext from "../Context/AppContext";
import "../Styles/RenderMessage.css";

const RenderAllMessages = () => {
  const { connection, recivedMessages, setRecivedMessages, username } =
    useContext(AppContext);
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    if (!connection) return;

    connection.on("ReceberMensagem", (usuario, mensagem) => {
      var objMessage = { user: usuario, userMessage: mensagem };

      console.log(Object.keys(objMessage));
      setMensagens((prevMensagens) => [...prevMensagens, objMessage]);
      setRecivedMessages((prevMensagens) => [...prevMensagens, objMessage]);
    });

    return () => {};
  }, [connection]);

  // If last message is from the same user, don't render the "You" label
  const shouldRenderYouLabel =
    mensagens.length === 0 || mensagens[mensagens.length - 1].user !== username;

  return (
    <ul className="RenderMessageConteiner">
      {mensagens.map(({ user, userMessage, index }) => (
        <li
          key={index}
          className={user === username ? "CurrentUser" : "OtherUser"}
        >
          <div
            className={user === username ? "CurrentUserSide" : "OtherUserSide"}
          >
            {user !== username && (
              <h4 className="RenderMessageOther">{user}</h4>
            )}
            <h5
              className={
                user === username ? "RenderMessageYou" : "RenderMessageOther"
              }
            >
              {shouldRenderYouLabel && user === username ? "You" : ""}
              {userMessage}
            </h5>
          </div>
        </li>
      ))}
      <ChatMain />
    </ul>
  );
};

export default RenderAllMessages;
