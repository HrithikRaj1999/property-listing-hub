import { useEffect } from "react";
import SingleList from "../components/Listing/SingleList";
import { LABELS } from "../constants/labels";
import useShowListing, { itemType } from "../hooks/useShowListing";

const ShowListings = () => {
  const { currentUser } = useShowListing();
  const { fetchListings } = useShowListing();
  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <div>
      <h1>{LABELS.LISTING}</h1>
      <div className="flex m-3 p-1 flex-wrap gap-6  ">
        {currentUser?.listings &&
          currentUser?.listings.map((item: itemType) => (
            <SingleList key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default ShowListings;
