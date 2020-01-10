import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppState, onWSMessage, onWSOpen } from "../../model/store";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const ws = useSelector((state: AppState) => state.ws);

  useEffect(() => {
    console.log("============= useEffect");
    ws.addEventListener("open", e => {
      console.log(e);
      dispatch(onWSOpen());
    });
    ws.addEventListener("message", e => {
      console.log(e);
      const data = JSON.parse(e.data);
      dispatch(onWSMessage(data.message));
    });
  }, [ws, dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
