import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import api from "../config/customApi";
import { RootState } from "../redux/store";
import { clearUserData } from "../redux/user/userSlice";

const PrivateRoute = () => {
  const userDispath = useDispatch();
  const navigate = useNavigate();
  const checkCookieExists = async () => {
    try {
      const res = await api.get("auth/checkCookie", { withCredentials: true });
    } catch (error: any) {
      if (!error.response.data.success) {
        userDispath(clearUserData());
        navigate("/signin");
      }
      console.error(error);
    }
  };
  useEffect(() => {
    // check if cookie exits
    // if is does not exists then clearly empty the  redux persists and move the user to sign in at it has expired or browser session was closed
    checkCookieExists();
  }, []);

  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  if (!currentUser) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
