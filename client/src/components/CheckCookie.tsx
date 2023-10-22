// Import necessary hooks and components from React and Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import api from "../config/customApi"; // Importing the custom API configuration
import { RootState } from "../redux/store"; // Importing the RootState type for useSelector hook
import { clearUserData } from "../redux/user/userSlice"; // Importing the action creator to clear user data from Redux store

// Define the CheckCookie component
const CheckCookie = () => {
  // Using the useSelector hook to extract currentUser and keepMeSignedIn from the Redux store
  const { currentUser, keepMeSignedIn } = useSelector(
    (state: RootState) => state.userReducer
  );

  // Using the useDispatch hook to get the dispatch function from the Redux store
  const userDispatch = useDispatch();

  // Using the useState hook to maintain a local state variable to decide which component to render
  const [componentToRender, setComponentToRender] = useState(
    <h1>Loading...</h1> // Default state is a loading message
  );

  // Define a function to check if the cookie exists
  const checkCookieExists = async () => {
    try {
      // Try to make an API call to check if the cookie exists
      const res = await api.get("/checkCookie", {
        withCredentials: true, // withCredentials is set to true to send cookies with the request
      });
      // If the API call is successful and the cookie exists, render the Outlet component
      if (res.data.success) {
        setComponentToRender(<Outlet />);
      }
    } catch (error) {
      // If an error occurs while making the API call
      if (keepMeSignedIn) {
        // If the user has opted to stay signed in
        try {
          // Try to refresh the token by making another API call
          await api.get(`auth/getToken/${currentUser?._id}`, {
            withCredentials: true,
          });
          // If the token is refreshed successfully, update the session storage and render the Outlet component
          sessionStorage.setItem("status", "user is cookies refreshed");
          setComponentToRender(<Outlet />);
        } catch (error) {
          // If an error occurs while refreshing the token, clear the user data from the Redux store and redirect to sign-in page
          userDispatch(clearUserData());
          setComponentToRender(<Navigate to="/signin" />);
        }
      } else {
        // If the user has not opted to stay signed in, clear the user data from the Redux store and redirect to sign-in page
        userDispatch(clearUserData());
        setComponentToRender(<Navigate to="/signin" />);
      }
    }
  };

  // Using the useEffect hook to run the checkCookieExists function when the component mounts
  // This is necessary to check the cookie existence as soon as the component is rendered
  useEffect(() => {
    checkCookieExists();
  }, []);

  // Render the component based on the current state
  return componentToRender;
};

// Export the CheckCookie component for use in other files
export default CheckCookie;
