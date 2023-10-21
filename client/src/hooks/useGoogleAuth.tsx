import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/customApi";
import { SIGNIN } from "../constants/client_message";
import { app } from "../firebase/firebase";
import { signInSuccess } from "../redux/user/userSlice";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const userDispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const res = await signInWithPopup(auth, provider);
      const data = await api.post("/auth/google", {
        name: res.user.displayName,
        email: res.user.email,
        photoUrl: res.user.photoURL,
      });
      userDispatch(signInSuccess(data));
      toast.success(SIGNIN.SUCCESS);
      navigate("/");
      console.log({ googleResponse: res, backendresponse: data });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || error);
    }
  };
  return {
    handleGoogleAuth,
  };
};
