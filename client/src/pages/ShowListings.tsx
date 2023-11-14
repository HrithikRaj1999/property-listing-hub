import { useEffect } from "react";
import SingleList from "../components/Listing/SingleList";
import useShowListing from "../hooks/useShowListing";
const ShowListings = () => {
  const { currentUser } = useShowListing();
  const { fetchListings } = useShowListing();
  useEffect(() => {
    fetchListings();
  }, []);
  return (
    <div className="flex m-6  flex-wrap justify-center sm:justify-start gap-6 ">
      {currentUser?.listings &&
        currentUser?.listings.map((item: itemType) => (
          <SingleList key={item._id} item={item} />
        ))}
    </div>
  );
};

export default ShowListings;
