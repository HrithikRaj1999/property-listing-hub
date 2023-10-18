// authReducer.ts
interface State {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  error: any;
}

interface Action {
  type:
    | "SET_USER_NAME"
    | "SET_EMAIL"
    | "SET_PASSWORD"
    | "SET_LOADING"
    | "SET_ERROR";
  payload: any;
}

const initialState: State = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: {},
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER_NAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export { initialState, reducer };
