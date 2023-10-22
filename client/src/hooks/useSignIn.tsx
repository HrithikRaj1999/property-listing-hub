import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";
import { SIGNIN } from "../constants/clientMessage";
import { RootState } from "../redux/store";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { initialState, reducer } from "../util/signUpReducer";

const useSignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const userDispatch = useDispatch(); //It allows you to send (or "dispatch") actions to your Redux store, which in turn triggers changes in your application's state.
  const { loading, error } = useSelector(
    (state: RootState) => state.userReducer
  ); //useSelector in a Redux-based application is to access and manage the application's state stored in the Redux store ir. user Store
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userDispatch(signInStart());
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
      userDispatch(signInSuccess(res.data));
      toast.success(SIGNIN.SUCCESS, {
        toastId: SIGNIN.SUCCESS,
      });
      navigate("/");
    } catch (error: any) {
      userDispatch(signInFailure(error.response.data.message));
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
    loading,
    error,
  };
};

export default useSignIn;
