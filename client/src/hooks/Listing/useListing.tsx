import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { CLIENT_MESSAGE, TOAST_ID } from "../../constants/clientMessage";
import { app } from "../../firebase/firebase";
import * as Yup from "yup";
import api from "../../config/customApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

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
  imageUrls: File[];
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
    semiFurnished: Yup.boolean(),
    unfurnished: Yup.boolean(),
  }),
  specifications: Yup.object().shape({
    bathroom: Yup.number().min(1).max(10).required(),
    bedrooms: Yup.number().min(1).max(10).required(),
    hall: Yup.number().min(1).max(5).required(),
    regularPrice: Yup.number().min(1).required(),
    discountedPrice: Yup.number().min(1).required(),
  }),
});
const useListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updatedPictureList = (id: number, values: ListingFormDataType) => {
    const img = Array.from(values.imageUrls);
    img.splice(id, 1);

    return img;
  };
  const handleImagesSubmit = async (
    values: ListingFormDataType,
    setFieldValue: (arg0: string, arg1: string[]) => void
  ) => {
    if (_.isEmpty(values.imageUrls))
      toast.error(CLIENT_MESSAGE.NO_PHOTO_SELECTED);
    else if (values.imageUrls.length > 0 && values.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < values.imageUrls.length; i++) {
        promises.push(storageImage(values.imageUrls[i] as File));
      }
      try {
        const urls: string[] = await Promise.all(promises);
        const res = await api.post(
          "/listing/create",
          {
            ...values,
            imageUrls: [...urls],
            userRef: currentUser?._id,
          },
          { withCredentials: true }
        );
        navigate(`/listing/${res.data.listing._id}`);
        toast.success(CLIENT_MESSAGE.SUCCESS_LISTING_CREATED);
        toast.dismiss(TOAST_ID);
      } catch (error: any) {
        setFieldValue("imageUrls", []);
        toast.dismiss(TOAST_ID);
        toast.error(error.response.data.message);
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
    handleImagesSubmit,
    handleChange,
    updatedPictureList,
  };
};

export default useListing;
