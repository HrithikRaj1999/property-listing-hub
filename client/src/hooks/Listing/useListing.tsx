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
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: FacilitiesType;
  imageUrls: File[];
}
const inititalFormikData: ListingFormDataType = {
  name: "",
  description: "",
  address: "",
  phone: "",
  type: "rent",
  facilities: {
    parkingSpot: false,
    swimmingPool: false,
  },
  roomType: "furnished",
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
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(23, "Name must be at most 23 characters")
    .required("Name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .required("Please provide a phone number")
    .matches(/^[0-9]+$/, "Phone number must consist of digits only")
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
  description: Yup.string().required("Description is required"),
  type: Yup.string()
    .oneOf(["sell", "rent"], 'Type must be either "sell" or "rent"')
    .required("Property type is required"),
  facilities: Yup.object().shape({
    parkingSpot: Yup.boolean().required(
      "Parking spot availability must be specified"
    ),
    swimmingPool: Yup.boolean().required(
      "Swimming pool availability must be specified"
    ),
  }),
  specifications: Yup.object().shape({
    bathroom: Yup.number()
      .min(1, "There must be at least 1 bathroom")
      .max(10, "There can be at most 10 bathrooms")
      .required("Number of bathrooms is required"),
    bedrooms: Yup.number()
      .min(1, "There must be at least 1 bedroom")
      .max(10, "There can be at most 10 bedrooms")
      .required("Number of bedrooms is required"),
    hall: Yup.number()
      .min(1, "There must be at least 1 hall")
      .max(5, "There can be at most 5 halls")
      .required("Number of halls is required"),
    regularPrice: Yup.number()
      .min(1, "Regular price must be at least 1")
      .required("Regular price is required"),
    discountedPrice: Yup.number()
      .min(1, "Discounted price must be at least 1")
      .required("Discounted price is required"),
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
