import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const { handleSubmit, state, reducer, dispatch } = useSignUp();
  return (
    <div className="max-w-sm p-5 mx-auto min-w-sm">
      <h1 className="text-3xl font-bold text-center my-4">Sign Up</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg"
          type="text"
          id="username"
          placeholder="Username"
          value={state.username}
          onChange={(e) =>
            dispatch({ type: "SET_USER_NAME", payload: e.target.value })
          }
        />
        <input
          className="border p-3 rounded-lg"
          type="email"
          id="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "SET_EMAIL", payload: e.target.value })
          }
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          id="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "SET_PASSWORD", payload: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
        >
          Sign Up
        </button>
      </form>
      <div className="my-4 gap-3">
        <p className="text-slate-500">Have an account?</p>
        <Link className="text-blue-600 font-semibold" to="/sign-in">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
