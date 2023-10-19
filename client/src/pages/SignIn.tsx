import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";

const SignIn = () => {
  const { handleSubmit, state, dispatch } = useSignIn();
  return (
    <div className="max-w-sm p-5 mx-auto min-w-sm">
      <h1 className="text-3xl font-bold text-center my-4">Sign In</h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
        <div className="relative">
          <input
            className="border p-3 w-full rounded-lg"
            type={state.passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
          />
          <span
            className="absolute inset-y-0 right-5 flex items-center text-black"
            onClick={() =>
              dispatch({
                type: "TOGGLE_PASSWORD_VISIBILITY",
                payload: !state.passwordVisible,
              })
            }
          >
            {state.passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          disabled={state.error}
          className="bg-slate-900 text-white p-4 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
        >
          {state.loading ? "Loading...." : "Sign In"}
        </button>
      </form>
      <div className="flex  justify-between items-start  flex-wrap my-4 gap-2">
        <div>
          <p className="text-sm text-slate-700">Don't have an account?</p>
          <Link className="text-blue-600 font-semibold" to="/signup">
            Sign up
          </Link>
        </div>

        <Link className="text-sm  text-blue-600 font-semibold" to="/signin">
          <p className="text-slate-700">Forgot Password?</p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
