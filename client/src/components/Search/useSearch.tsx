import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../config/customApi";
import { itemType } from "../../hooks/useShowListing";
import { toast } from "react-toastify";

export interface SearchValuesType {
  searchText: string;
  sortBy: string;
  type: string[];
  amenities: string[];
  roomType: string;
  filteredListings: itemType[];
}

const useSearch = () => {
  const fetchListings = async (searchQueryParams: string) => {
    try {
      const { data } = await api.get(`listing/get-filtered-listings?${searchQueryParams}`);
      return data;
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (
    values: SearchValuesType,
    formikHelpers: FormikHelpers<SearchValuesType>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("searchText", values.searchText);
      urlParams.set("sortBy", values.sortBy);
      urlParams.set("type", values.type.join(","));
      urlParams.set("amenities", values.amenities.join(","));
      urlParams.set("roomType", values.roomType);
      const searchQueryParams = urlParams.toString();
      navigate(`/search?${searchQueryParams}`);
      const data = await fetchListings(searchQueryParams);
      formikHelpers.setFieldValue("filteredListings", [...data?.listings]);
      formikHelpers.setSubmitting(false);
    } catch (error) {
      formikHelpers.setSubmitting(false);
    }
  };
  const options = [
    { value: "", label: "Select" },
    { value: "specifications.regularPrice_desc", label: "Price high to low " },
    { value: "specifications.regularPrice_asc", label: "Price low to high" },
    { value: "createdAt_desc", label: "Latest" },
    { value: "createdAt_asc", label: "Oldest" },
  ];

  const initialValues = {
    searchText: "",
    sortBy: "",
    type: [""],
    amenities: [""],
    roomType: "",
    filteredListings: [],
  };
  return { options, initialValues, handleSubmit };
};

export default useSearch;
