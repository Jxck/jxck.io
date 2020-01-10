import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginCreator } from "../../model/store";

const Login: React.FC = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username: string = formData.get("username") as string;
    console.log(username);
    dispatch(loginCreator(username));
    history.push("/chat");
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Join</legend>
        <label htmlFor="username">username:</label>
        <input type="text" name="username" id="username" />
        <button type="submit">join</button>
      </fieldset>
    </form>
  );
};

export default Login;
