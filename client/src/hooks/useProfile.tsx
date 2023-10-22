import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useReducer, useRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../config/customApi";
import { CLIENT_MESSAGE } from "../constants/clientMessage";
import { app } from "../firebase/firebase";
import { RootState } from "../redux/store";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { initialState, reducer } from "../util/signUpReducer";

//firebase storage
//   allow read;
//   allow write:if
//   request.resource.size< 10 * 1024 * 1024 &&
//   request.resource.contentType.matches('images/.*')

interface formData {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
const useProfile = () => {
  const [file, setFile] = useState<File | null>(null);
  const { loading, error } = useSelector(
    (state: RootState) => state.userReducer
  );

  const userDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filePercentage, setFilePercentage] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<object | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<formData | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const passwordShowIcon = state.passwordVisible ? (
    <EyeOff size={20} />
  ) : (
    <Eye size={20} />
  );
  const handlePicClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handlePassView = () =>
    dispatch({
      type: "TOGGLE_PASSWORD_VISIBILITY",
      payload: !state.passwordVisible,
    });

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("select a photo to upload");
      return;
    }
    try {
      const newUploadedFile = e.target.files[0];
      const storage = getStorage(app);
      const fileName = newUploadedFile.name + new Date().getTime();
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, newUploadedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          toast.info("Upload started.....", {
            toastId: "upload",
            hideProgressBar: true,
          });
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
          toast.update("upload", {
            render: `Uploading ${Math.round(progress)}%`,
          });
        },
        (error: any) => {
          setFileUploadError(error);
          toast.dismiss("upload");
          toast.error(
            "Invalid, photo must be less than 5 mb or select the correct type"
          );
          setFilePercentage(0); // You might want to reset the percentage on error
          e.target.files = null;
        },
        async () => {
          // Wait for the upload task to complete
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setFilePercentage(100); // Set the percentage to 100 on success
          setFileUploadError(null);
          toast.dismiss("upload");
          toast.success("File Uploaded Successfully");
          setFormData({ ...formData, avatar: downloadUrl });
          e.target.files = null;
        }
      );

      setFile(newUploadedFile);
      e.target.files = null;
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    try {
      userDispatch(updateUserStart());
      const res = await api.put(`user/update/${currentUser?._id}`, formData, {
        withCredentials: true,
      });
      toast.success(CLIENT_MESSAGE.SUCCESS_UPDATE);
      console.log(res.data.user);
      userDispatch(updateUserSuccess(res.data.user));
    } catch (error: any) {
      userDispatch(updateUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
  return {
    currentUser,
    fileRef,
    file,
    formData,
    handlePicClick,
    handlePicUpload,
    filePercentage,
    fileUploadError,
    handleInputChange,
    state,
    dispatch,
    handleUpdateSubmit,
    loading,
    error,
    handlePassView,
    passwordShowIcon,
  };
};

export default useProfile;