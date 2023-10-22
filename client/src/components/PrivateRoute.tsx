import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
