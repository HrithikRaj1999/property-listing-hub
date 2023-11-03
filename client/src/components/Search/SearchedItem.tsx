import React from "react";
import { ListingDataType } from "../../hooks/Listing/useListing";
import { itemType } from "../../hooks/useShowListing";
import ShowSingleFilteredListing from "./ShowSingleFilteredListing";
import { ListingType } from "../../pages/ShowSingleList";

interface propType {
  searchedData: itemType[];
}
const SearchedItem = ({ searchedData }: propType) => {
  // Assume we map over searchedData to create an array of JSX elements
  const items = searchedData.map((data: itemType) => {
    // Render each item here
    return (
      <div key={data?._id}>
        <ShowSingleFilteredListing item={data} />
      </div>
    );
  });

  // Wrap the array of items with a fragment
  return <>{items}</>;
};

export default SearchedItem;
