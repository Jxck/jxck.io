import { createStore } from "redux";

// Actions
type LoginAction = { type: "LOGIN"; username: string };
type LogoutAction = { type: "LOGOUT" };
type InputMessageAction = { type: "INPUT_MESSAGE"; message: string };
type onWebSocketOpenAction = { type: "ON_WS_OPEN" };
type onWebSocketMessageAction = { type: "ON_WS_MESSAGE"; message: string };
type appActions = LoginAction | LogoutAction | InputMessageAction | onWebSocketOpenAction | onWebSocketMessageAction;

// Action Creators
export const loginCreator = (username: string): LoginAction => {
  return { type: "LOGIN", username };
};

export const logoutCreator = (): LogoutAction => {
  return { type: "LOGOUT" };
};

export const inputMessageCreator = (message: string): InputMessageAction => {
  return { type: "INPUT_MESSAGE", message };
};

export const onWSOpen = () => {
  return { type: "ON_WS_OPEN" };
};

export const onWSMessage = (message: string) => {
  return { type: "ON_WS_MESSAGE", message };
};

export interface AppState {
  username: string | null;
  messages: string[];
  wsReady: boolean;
  ws: WebSocket;
}

const initialState: AppState = {
  username: null,
  messages: [],
  wsReady: false,
  ws: new WebSocket("wss://ws.jxck.io", ["broadcast", "redux-chat"])
};

const reducer = (state: AppState = initialState, action: appActions) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN": {
      const { username } = action;
      return { ...state, username };
    }
    case "LOGOUT": {
      const username = null;
      return { ...state, username };
    }
    case "INPUT_MESSAGE": {
      const { message } = action;
      const { ws } = state;
      ws.send(JSON.stringify({ message }));
      return { ...state };
    }
    case "ON_WS_OPEN": {
      return { ...state, wsReady: true };
    }
    case "ON_WS_MESSAGE": {
      const { message } = action;
      return { ...state, messages: [...state.messages, message] };
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__());
