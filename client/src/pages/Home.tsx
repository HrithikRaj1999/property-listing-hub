import { useEffect, useState } from "react";
import api from "../config/customApi";
import { itemType } from "../hooks/useShowListing";
import AllListing from "../components/Listing/AllListing";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Home = () => {
  const [listings, setListings] = useState<itemType[] | null>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/listing/get-all-listings`);
      setListings([...data?.listings]);
      setLoading(false);
    } catch (error: any) {
      setLoading(true);
      toast.error(error?.response.data.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading)
    return (
      <div className="flex m-3 p-5 flex-wrap justify-center items-center h-screen sm:justify-center gap-6 sm:w-full ">
        <Spinner height={60} width={60} />
      </div>
    );
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
