import { useEffect, useState } from "react";
import api from "../config/customApi";
import { itemType } from "../hooks/useShowListing";
import AllListing from "../components/Listing/AllListing";

const Home = () => {
  const [listings, setListings] = useState<itemType[] | null>([]);
  const fetchData = async () => {
    try {
      const { data } = await api.get(`/listing/get-all-listings`);
      setListings([...data?.listings]);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex m-3 p-5 flex-wrap justify-center sm:justify-center gap-6 sm:w-full ">
      {listings && listings.length > 0 ? (
        listings.map((item) => <AllListing item={item} />)
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default Home;
