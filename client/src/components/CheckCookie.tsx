import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import api from "../config/customApi";
import { RootState } from "../redux/store";
import { clearUserData } from "../redux/user/userSlice";

const CheckCookie = () => {
  const { currentUser, keepMeSignedIn } = useSelector(
    (state: RootState) => state.userReducer
  );
  console.log({
    check: keepMeSignedIn === true,
    data: sessionStorage.getItem("status"),
  });
  const userDispatch = useDispatch();

  const [componentToRender, setComponentToRender] = useState(
    <h1>Loading...</h1>
  );

  const checkCookieExists = async () => {
    try {
      const res = await api.get("/checkCookie", {
        withCredentials: true,
      });
      if (res.data.success) setComponentToRender(<Outlet />);
    } catch (error) {
      try {
        if (
          keepMeSignedIn === true &&
          sessionStorage.getItem("status") === null
        ) {
          await api.get(`auth/getToken/${currentUser?._id}`, {
            withCredentials: true,
          });
          sessionStorage.setItem("status", "user is cookies refreshed ");
          setComponentToRender(<Outlet />);
        }
      } catch (error) {
        try {
          if (
            keepMeSignedIn === false &&
            sessionStorage.getItem("status") === null
          ) {
            userDispatch(clearUserData());
            setComponentToRender(<Navigate to="/signin" />);
          }
        } catch (error) {
          setComponentToRender(<Navigate to="/signin" />);
        }
      }
      //if neither cookie exists neither nor user has done keep me sign In
    }
  };

  useEffect(() => {
    checkCookieExists();
  }, []);

  return componentToRender;
};

export default CheckCookie;
