import React from "react";
import { Eye } from "react-feather";
import { FaHome, FaInfoCircle, FaRoute } from "react-icons/fa";
import { Link } from "react-router-dom";
import { itemType } from "../../hooks/useShowListing";

interface propsType {
  item: itemType;
}
const AllListing = (props: propsType) => {
  const { item } = props;
  return (
    <div className="max-w-[400px] max-h-[500px] sm:max-h-[550px]  overflow-hidden bg-white rounded-lg hover:shadow-2xl shadow-lg flex flex-col justify-center">
      <Link to={`/show-listing/${item._id}`}>
        <div className="relative">
          <img
            className="w-full sm:h-64 transition duration-100"
            src={typeof item.imageUrls[0] === "string" ? item.imageUrls[0] : ""}
            alt={item.name}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition duration-100 hover:bg-opacity-50 hover:opacity-100">
            <Eye color={"white"} size={40} />
          </div>
        </div>
      </Link>
      <div className="flex-2 p-6 items-center h-[100px] sm:h-[250px] max-h-[150px] sm:max-h-[250px]">
        <h4 className="text-2xl font-semibold text-gray-700">{item.name}</h4>
        <div className="my-3 flex gap-3 flex-wrap items-center">
          <p className="flex text-sm gap-3 text-gray-700">
            <FaInfoCircle size={20} />
            {item.description.split(" ").slice(0, 40).join(" ")}....
          </p>
          <h5 className="flex text-sm gap-3 text-gray-700">
            <FaRoute />
            {item.address.slice(0, 20)}
          </h5>

          <h6 className="flex text-sm gap-3 text-gray-700">
            <FaHome />
            {item.roomType.toUpperCase()}
          </h6>
        </div>
      </div>

      <div className="flex-1 max-h-[88px] flex justify-center gap-4 p-5 bg-gray-100 ">
        <span className="line-through">₹{item.specifications.regularPrice.toFixed(2)}</span>
        <span>₹{item.specifications.discountedPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default AllListing;
