import React from "react";

interface MessageListProps {
  messages: string[];
}

const MessageList: React.FC<MessageListProps> = (props: MessageListProps) => {
  const messages = props.messages;
  return (
    <ul>
      {messages.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </ul>
  );
};

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  const message = props.message;
  return <li>{message}</li>;
};

export default MessageList;
