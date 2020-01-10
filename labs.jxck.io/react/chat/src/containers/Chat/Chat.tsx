import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageInput from "../../components/MessageInput";
import MessageList from "../../components/MessageList";
import { AppState, inputMessageCreator, logoutCreator } from "../../model/store";

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: AppState) => state.username);
  const messages = useSelector((state: AppState) => state.messages);
  const wsReady = useSelector((state: AppState) => state.wsReady);

  const handleSubmit = (message: string) => dispatch(inputMessageCreator(message));
  const handleClick = () => dispatch(logoutCreator());
  const disabled = !wsReady;

  return (
    <div>
      <h1>{username}</h1>
      <MessageList messages={messages} />
      <MessageInput handleSubmit={handleSubmit} disabled={disabled} />
      <Link to="/" onClick={() => handleClick()}>
        logout
      </Link>
    </div>
  );
};

export default Chat;
