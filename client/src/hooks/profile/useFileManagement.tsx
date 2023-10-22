import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { CLIENT_MESSAGE, TOAST_ID } from "../../constants/clientMessage";
import { app } from "../../firebase/firebase";
import { FormDataType } from "./useProfile";
//firebase storage
//   allow read;
//   allow write:if
//   request.resource.size< 10 * 1024 * 1024 &&
//   request.resource.contentType.matches('images/.*')

const useFileManagement = (
  formData: FormDataType | null,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType | null>>
) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePercentage, setFilePercentage] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<object | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handlePicClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handlePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error(CLIENT_MESSAGE.PHOTO_NOT_UPLOADED);
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
          toast.info(CLIENT_MESSAGE.UPLOAD_STARTED, {
            toastId: TOAST_ID,
            hideProgressBar: true,
          });
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
          toast.update(TOAST_ID, {
            render: `Uploading ${Math.round(progress)}%`,
          });
        },
        (error: any) => {
          setFileUploadError(error);
          toast.dismiss(TOAST_ID);
          toast.error(CLIENT_MESSAGE.INVALID_PHOTO);
          setFilePercentage(0); // You might want to reset the percentage on error
          e.target.files = null;
        },
        async () => {
          // Wait for the upload task to complete
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setFilePercentage(100); // Set the percentage to 100 on success
          setFileUploadError(null);
          toast.dismiss(TOAST_ID);
          toast.success(CLIENT_MESSAGE.SUCCESS_PHOTO_UPLOAD);
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: downloadUrl,
          }));
        }
      );
      setFile(newUploadedFile);
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };
  return {
    handlePicClick,
    handlePicUpload,
    filePercentage,
    fileUploadError,
    file,
    fileRef,
  };
};

export default useFileManagement;
