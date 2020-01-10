import React, { FormEvent } from "react";

interface MessageInputProps {
  handleSubmit: (message: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = (props: MessageInputProps) => {
  const { handleSubmit, disabled } = props;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message: string = formData.get("message") as string;
    console.log(message);
    handleSubmit(message);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="message" />
      <button type="submit" disabled={disabled}>
        send
      </button>
    </form>
  );
};

export default MessageInput;
