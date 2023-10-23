import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { CLIENT_MESSAGE, TOAST_ID } from "../../constants/clientMessage";
import { app } from "../../firebase/firebase";
interface ListingFormDataType {
  imageUrls: string[];
}
const useListing = () => {
  const [files, setFiles] = useState<FileList | []>([]);
  const [formData, setFormData] = useState<ListingFormDataType>({
    imageUrls: [],
  });
  console.log(formData);
  const handleImagesSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      files &&
      files.length > 0 &&
      files.length + formData.imageUrls.length < 6
    ) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i] as File));
      }
      try {
        const urls: string[] = await Promise.all(promises);
        toast.success(CLIENT_MESSAGE.SUCCESS_LISTING_PHOTO_UPLOAD);
        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, ...urls],
        });
        toast.dismiss(TOAST_ID);
      } catch (error) {
        toast.dismiss(TOAST_ID);
        toast.error(CLIENT_MESSAGE.INVALID_PHOTO);
      }
    } else {
      toast.error(CLIENT_MESSAGE.FAILED_LISTING_PHOTO_UPLOAD);
    }
  };
  const storageImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          toast.info(CLIENT_MESSAGE.UPLOAD_STARTED, {
            toastId: TOAST_ID,
            hideProgressBar: true,
          });
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.update(TOAST_ID, {
            render: `Uploading ${Math.round(progress)}%`,
          });
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };
  return { setFiles, handleImagesSubmit };
};

export default useListing;
