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
import * as Yup from "yup";
import { useFormikContext } from "formik";

interface FacilitiesType {
  parkingSpot: boolean;
  furnished: boolean;
  semiFurnished: boolean;
  unfurnished: boolean;
  swimmingPool: boolean;
}
interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
export interface ListingFormDataType {
  name: string;
  description: string;
  address: string;
  type: string;
  specifications: SpecificationsType;
  facilities: FacilitiesType;
  imageUrls: string[];
}
const inititalFormikData: ListingFormDataType = {
  name: "",
  description: "",
  address: "",
  type: "rent",
  facilities: {
    parkingSpot: false,
    furnished: false,
    semiFurnished: false,
    unfurnished: false,
    swimmingPool: false,
  },

  specifications: {
    bathroom: 1,
    bedrooms: 1,
    hall: 1,
    regularPrice: 0,
    discountedPrice: 0,
  },
  imageUrls: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().min(10).max(62).required("Required"),
  address: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  type: Yup.string()
    .oneOf(["sell", "rent"], "Invalid type")
    .required("Required"),
  facilities: Yup.object().shape({
    parkingSpot: Yup.boolean(),
    swimmingPool: Yup.boolean(),
    furnished: Yup.boolean(),
    semifurnished: Yup.boolean(),
    unfurnished: Yup.boolean(),
  }),
  specifications: Yup.object().shape({
    bedrooms: Yup.number().min(1).max(10).required(),
    baths: Yup.number().min(1).max(10).required(),
    hall: Yup.number().min(1).max(5).required(),
    regularprice: Yup.number().min(1).required(),
    discountedPrice: Yup.number().min(1).required(),
  }),
});
const useListing = () => {
  const [files, setFiles] = useState<FileList | []>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleImagesSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    values: ListingFormDataType,
    setFieldValue: (arg0: string, arg1: string[]) => void
  ) => {
    if (
      files &&
      files.length > 0 &&
      files.length + values.imageUrls.length < 6
    ) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i] as File));
      }
      try {
        const urls: string[] = await Promise.all(promises);
        toast.success(CLIENT_MESSAGE.SUCCESS_LISTING_PHOTO_UPLOAD);
        setFieldValue("imageUrls", [...values.imageUrls, ...urls]);
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
  return {
    inititalFormikData,
    validationSchema,
    setFiles,
    handleImagesSubmit,
    handleChange,
  };
};

export default useListing;
