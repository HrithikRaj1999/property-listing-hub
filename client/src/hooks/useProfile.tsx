import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { app } from "../firebase/firebase";
import { RootState } from "../redux/store";

//firebase storage
//   allow read;
//   allow write:if
//   request.resource.size< 10 * 1024 * 1024 &&
//   request.resource.contentType.matches('images/.*')

interface formData {
  avatar: string;
}
const useProfile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePercentage, setFilePercentage] = useState<number>(0);
  const [fileUploadError, setFileUploadError] = useState<object | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<formData | null>(null);
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  console.log(formData);
  const handlePicClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

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
          setFormData({ ...formData, avatar: downloadUrl });
          setFilePercentage(100); // Set the percentage to 100 on success
          setFileUploadError(null);
          toast.dismiss("upload");
          toast.success("File Uploaded Successfully");
          e.target.files = null;
        }
      );

      setFile(newUploadedFile);
      e.target.files = null;
    } catch (error: any) {
      toast.error(error);
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
  };
};

export default useProfile;
