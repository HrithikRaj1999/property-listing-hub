import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";
import { initialState, reducer } from "../util/signUpReducer";

const useSignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    const { username, email, password } = state;
    try {
      const res = await api.post("auth/signup", {
        username,
        email,
        password,
      });

      toast.success("User Sign Up successfully");
      navigate("/signin");
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  return {
    handleSubmit,
    state,
    reducer,
    dispatch,
  };
};

export default useSignUp;
