import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "react-toastify";
import { CLIENT_MESSAGE, TOAST_ID } from "../../constants/clientMessage";
import { app } from "../../firebase/firebase";
import * as Yup from "yup";
import api from "../../config/customApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { LABELS } from "../../constants/labels";
import { MultiValue } from "react-select/dist/declarations/src";
export interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
export interface ListingDataType {
  _id?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: string[];
  imageUrls: File[];
}
export const inititalFormikData: ListingDataType = {
  name: "",
  description: "",
  address: "",
  phone: "",
  type: "rent",
  facilities: ["Tennis Court", "Football Ground"],
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

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(23, "Name must be at most 23 characters")
    .required("Name is required"),
  address: Yup.string().required("Address is required"),
  description: Yup.string().required("Description is required"),
  phone: Yup.string().test(
    "is-valid-phone",
    "Invalid phone number",
    (value) => !value || isValidPhoneNumber(value)
  ),
  type: Yup.string()
    .oneOf(["sell", "rent"], 'Type must be either "sell" or "rent"')
    .required("Property type is required"),
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
const facilityOptions = [
  { value: LABELS.PARKING, label: LABELS.PARKING },
  { value: LABELS.POOL, label: LABELS.POOL },
  { value: LABELS.SECURITY, label: LABELS.SECURITY },
  { value: LABELS.POWER_BACKUP, label: LABELS.POWER_BACKUP },
  { value: LABELS.WATER_SUPPLY, label: LABELS.WATER_SUPPLY },
  { value: LABELS.ELEVATORS, label: LABELS.ELEVATORS },
  { value: LABELS.GYM, label: LABELS.GYM },
  { value: LABELS.PLAYGROUND, label: LABELS.PLAYGROUND },
  { value: LABELS.COMMUNITY_HALL, label: LABELS.COMMUNITY_HALL },
  { value: LABELS.GARDENS, label: LABELS.GARDENS },
  { value: LABELS.CAR_PARKING, label: LABELS.CAR_PARKING },
  { value: LABELS.WASTE_DISPOSAL, label: LABELS.WASTE_DISPOSAL },
  { value: LABELS.FIRE_SAFETY, label: LABELS.FIRE_SAFETY },
];
const useListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const updatedPictureList = (id: number, values: ListingDataType) => {
    const img = Array.from(values.imageUrls);
    img.splice(id, 1);
    return img;
  };

  const handleChangeOfSelect = (
    selectedOptions: MultiValue<{
      value: string;
      label: string;
      __isNew__?: boolean;
    }>,
    setFieldValue: (arg0: string, arg1: string[]) => void
  ) => {
    const filteredOptions = selectedOptions.map(({ label, ...rest }) => label);
    setFieldValue("facilities", filteredOptions);
  };
  const handleImagesSubmit = async (
    values: ListingDataType,
    setFieldValue: (arg0: string, arg1: string[]) => void
  ) => {
    if (_.isEmpty(values.imageUrls)) toast.error(CLIENT_MESSAGE.NO_PHOTO_SELECTED);
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
        navigate(`/show-listing/${res.data.listing._id}`);
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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    facilityOptions,
    handleImagesSubmit,
    handleChange,
    updatedPictureList,
    handleChangeOfSelect,
  };
};

export default useListing;
