import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";
import { SIGNIN } from "../constants/client_message";
import { initialState, reducer } from "../util/signUpReducer";

const useSignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    const { email, password } = state;
    try {
      const res = await api.post(
        "auth/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch({ type: "SET_LOADING", payload: false });
      toast.success(SIGNIN.SUCCESS, {
        toastId: SIGNIN.SUCCESS,
      });
      navigate("/");
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      dispatch({ type: "SET_LOADING", payload: false });
      return toast.error(error.response.data.message, {
        toastId: error.response.data.message,
      });
    }
  };

  return {
    handleSubmit,
    state,
    reducer,
    dispatch,
  };
};

export default useSignIn;
