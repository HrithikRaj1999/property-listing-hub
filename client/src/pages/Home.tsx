import { useEffect, useState } from "react";
import api from "../config/customApi";
import { itemType } from "../hooks/useShowListing";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { Eye } from "react-feather";
import OffersSection from "../components/Home/OfferSection";
import FeatureSection from "../components/Home/FeatureSection";
import useHomePage from "../components/Home/useHomePage";

const Home = () => {
  const { navigate, fetchData, listings, loading, offer, regular } = useHomePage();
  console.log("home Rendered");
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
    <div>
      {/* Hero Section */}
      <div className="bg-blue-500 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Find Your Dream Home</h1>
        <p className="text-xl mt-4">Explore the best houses and apartments for rent and sell</p>
        <button
          onClick={() => navigate("/search")}
          className="mt-6 px-6 py-2 bg-blue-700 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Browse Listings
        </button>
      </div>

      {/* Featured Listings */}
      <FeatureSection regularListings={regular} />
      {/**Offer sections */}
      <OffersSection offerListings={offer} />
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Charles Real Estate Brand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
