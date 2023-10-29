import React, { useEffect, useState } from "react";
import api from "../config/customApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLoading } from "../redux/user/userSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  ListingDataType,
  SpecificationsType,
} from "../hooks/Listing/useListing";
import {
  FaAudioDescription,
  FaFeatherAlt,
  FaFedora,
  FaHandPointRight,
  FaHome,
} from "react-icons/fa";

export interface ListingType {
  _id?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: string[];
  imageUrls: string[];
}
const ShowSingleList = () => {
  const { listId } = useParams();
  const [listing, setListing] = useState<ListingType | null>(null);
  SwiperCore.use([Navigation]);
  const { loading } = useSelector((state: RootState) => state.userReducer);
  const userDispatch = useDispatch();
  const fetchListing = async () => {
    try {
      userDispatch(setLoading(true));
      const res = await api.get(`/listing/show-listing/${listId}`);
      setListing({ ...res.data.listing });
      userDispatch(setLoading(false));
    } catch (error: any) {
      toast.error(error);
      userDispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchListing();
  }, [listId]);

  return loading && listing ? (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <Spinner height={10} width={10} />
      Loading....
    </div>
  ) : (
    <>
      <div>
        <Swiper
          navigation={true}
          className="mySwiper min-w-[375px] bg-black flex items-center h-[250px] sm:h-[500px] md:h-[700px]"
        >
          {listing?.imageUrls &&
            listing?.imageUrls.map((url, index) => (
              <SwiperSlide zoom={true} key={index}>
                <img
                  key={index}
                  alt="images"
                  className="coverbg-no-repeat"
                  src={url}
                ></img>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex bg-zinc-50 mt-3 p-4 pt-5 sm:pt-16  s mx-0 sm:mx-12 md:mx-16 flex-col rounded-xl gap-9">
        <span className="text-lg sm:text-2xl md:text-5xl font-semibold">
          {listing?.name} - ₹{listing?.specifications.regularPrice}/per month
        </span>
        <span className="text-base sm:text-base md:text-2xl font-thin flex gap-4 items-center">
          <FaHome size={40} /> {listing?.address}
        </span>
        <div className="flex flex-wrap gap-4">
          <button className="bg-red-800 text-white p-2 rounded-xl text-xs sm:text-sm ">
            For {listing?.type}
          </button>{" "}
          <button className="bg-blue-800 text-white p-2 rounded-xl text-xs sm:text-sm ">
            Discount Price - ₹{listing?.specifications.discountedPrice}/per
            month
          </button>
          <button className="bg-green-800 text-white p-2 rounded-xl text-xs sm:text-sm ">
            Room Type - {listing?.roomType.toUpperCase()}
          </button>
        </div>
        <div className="flex flex-col gap-3 justify-center rounded-2xl">
          <span className="text-2xl flex gap-3  items-center font-semibold text-green-800">
            {" "}
            <FaAudioDescription /> Discription -{" "}
          </span>{" "}
          <p className=" text-sm sm:text-xl p-8  max-w-[1000px]">
            {listing?.description}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-2xl flex gap-3 items-center font-semibold text-green-800">
            <FaFeatherAlt />
            Facilities-{" "}
          </span>
          <div className="flex items-center ml-12 flex-wrap gap-4">
            {listing?.facilities.map((item) => (
              <>
                <FaHandPointRight size={15} />
                <span className="text-xs sm:text-lg  font-bold text-black ">
                  {item}
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-2xl flex gap-3 items-center font-semibold text-green-800">
            <FaFedora />
            Specifications-{" "}
          </span>
          <div className="flex items-center ml-12 flex-wrap gap-4">
            {listing?.specifications &&
              Object.entries(listing?.specifications).map((specification) => {
                if (
                  !["regularPrice", "discountedPrice"].includes(
                    specification[0]
                  )
                ) {
                  return (
                    <React.Fragment>
                      <FaHandPointRight size={15} />
                      <span className="text-xs sm:text-lg font-bold text-black ">
                        {specification[1]} {specification[0]}
                      </span>
                    </React.Fragment>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowSingleList;
