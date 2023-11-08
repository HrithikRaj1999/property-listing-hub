import { FormikErrors, FormikHelpers, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../config/customApi";
import { itemType } from "../../hooks/useShowListing";
import { toast } from "react-toastify";
import FilteredListings from "./FilteredListings";
import { useState } from "react";
import { useSearchData } from "../../context/SearchedData";

export interface SearchValuesType {
  searchText: string;
  sortBy: string;
  type: string[];
  amenities: string[];
  roomType: string;
  filteredListings: itemType[];
}

const useSearch = () => {
  const navigate = useNavigate();
  const { searchText, setSearchedLisitingData } = useSearchData();
  const fetchListings = async (searchQueryParams: string = "") => {
    try {
      const { data } = await api.get(`listing/get-filtered-listings?${searchQueryParams}`);
      navigate(`/search?${searchQueryParams}`);
      return data;
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleLoadMore = async (
    values: SearchValuesType,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<SearchValuesType>>
  ) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("startIndex", values?.filteredListings?.length.toString());
      const searchQueryParams = urlParams.toString();
      const data = await fetchListings(searchQueryParams);
      navigate(`/search?${searchQueryParams}`);
      setFieldValue("filteredListings", [...values.filteredListings, ...data?.listings]);
      setSearchedLisitingData([...values.filteredListings, ...data?.listings]);
      toast.success("Fetched");
    } catch (error: any) {
      toast.error(error?.response?.data.message || "No more results");
    }
  };

  const handleSubmit = async (
    values: SearchValuesType,
    formikHelpers: FormikHelpers<SearchValuesType>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("searchText", searchText);
      urlParams.set("sortBy", values.sortBy);
      urlParams.set("type", values.type.join(","));
      urlParams.set("amenities", values.amenities.join(","));
      urlParams.set("roomType", values.roomType);
      const searchQueryParams = urlParams.toString();
      const data = await fetchListings(searchQueryParams);
      localStorage.setItem(
        "formik values",
        JSON.stringify({
          searchText,
          filteredListings: [...data?.listings],
          sortBy: values.sortBy,
          type: values.type,
          amenities: values.amenities,
          roomType: values.roomType,
        })
      );
      if (data?.listings?.length) {
        formikHelpers.setFieldValue("filteredListings", [...data?.listings]);
        setSearchedLisitingData([...data?.listings]);
      } else {
        setSearchedLisitingData([]);
      }

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
  const d = localStorage.getItem("formik values") || "";
  console.log(JSON.parse(d));
  const initVal = d
    ? JSON.parse(d)
    : {
        searchText: "",
        sortBy: "",
        type: [""],
        amenities: [""],
        roomType: "",
        filteredListings: [],
      };

  const [initialValue, setInitialValue] = useState<SearchValuesType>({ ...initVal });
  return { options, initialValue, setInitialValue, fetchListings, handleLoadMore, handleSubmit };
};

export default useSearch;
