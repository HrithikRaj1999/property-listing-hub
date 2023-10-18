// authReducer.ts
interface State {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  error: any;
  passwordVisible: boolean;
}

interface Action {
  type:
    | "SET_USER_NAME"
    | "SET_EMAIL"
    | "SET_PASSWORD"
    | "SET_LOADING"
    | "SET_ERROR"
    | "TOGGLE_PASSWORD_VISIBILITY";
  payload: any;
}

const initialState: State = {
  username: "",
  email: "",
  password: "",
  loading: false,
  error: null,
  passwordVisible: false,
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
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, passwordVisible: action.payload };
    default:
      return state;
  }
}

export { initialState, reducer };
