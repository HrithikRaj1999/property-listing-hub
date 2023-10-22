import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { ERROR_MESSAGE } from "../constants/clientMessage";
import { RootState } from "../redux/store";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);

  if (!currentUser) {
    toast.error(ERROR_MESSAGE.NOT_AUTHORIZED);
    return <Navigate to="/signIn" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
