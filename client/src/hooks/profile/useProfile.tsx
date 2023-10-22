import { useState } from "react";

import useFileManagement from "./useFileManagement";
import { useInputHandling } from "./useInputHandling";
import useUserActions from "./useUserActions";
export interface FormDataType {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

const useProfile = () => {
  const [formData, setFormData] = useState<FormDataType | null>(null);

  const {
    filePercentage,
    fileUploadError,
    file,
    fileRef,
    handlePicClick,
    handlePicUpload,
  } = useFileManagement(formData, setFormData);

  const { currentUser, handleSignOut, handleUserDelete, handleUpdateSubmit } =
    useUserActions(formData, setFormData);

  const {
    state,
    loading,
    error,
    passwordShowIcon,
    handleInputChange,
    handlePassView,
    dispatch,
  } = useInputHandling(formData, setFormData);
  const profilePic = formData?.avatar || currentUser?.avatar;
  return {
    currentUser,
    fileRef,
    profilePic,
    file,
    formData,
    filePercentage,
    fileUploadError,
    state,
    loading,
    error,
    passwordShowIcon,
    dispatch,
    handlePicClick,
    handlePicUpload,
    handleInputChange,
    handleUpdateSubmit,
    handlePassView,
    handleUserDelete,
    handleSignOut,
  };
};

export default useProfile;
