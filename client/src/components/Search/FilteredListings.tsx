import { useFormikContext } from "formik";
import { itemType } from "../../hooks/useShowListing";
import ShowSingleFilteredListing from "./ShowSingleFilteredListing";
import { SearchValuesType } from "./useSearch";
const FilteredListings = () => {
  const { values } = useFormikContext<SearchValuesType>();

  return values?.filteredListings.length > 0 ? (
    <>
      {values?.filteredListings.map((item: itemType) => (
        <ShowSingleFilteredListing key={item._id} item={item} />
      ))}
    </>
  ) : (
    <h1 className="text-2xl text-center">No Listing Found</h1>
  );
};

export default FilteredListings;
