import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { CLIENT_MESSAGE } from "../constants/clientMessage";
import { RootState } from "../redux/store";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  console.log(currentUser);
  if (!currentUser) {
    toast.error(CLIENT_MESSAGE.NOT_AUTHORIZED);
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
