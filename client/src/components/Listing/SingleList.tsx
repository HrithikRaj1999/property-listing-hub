import React, { useState, useEffect } from "react";

import useShowListing, { SingleListProps } from "../../hooks/useShowListing";

import { ArrowLeft, ArrowRight, Home, Info, Trash } from "react-feather";
import CustomModal from "../CustomModal";
import { Link } from "react-router-dom";

const SingleList = (props: SingleListProps) => {
  const { item } = props;
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(
    () => {
      // Initialize a counter for loaded images
      let imagesLoaded = 0;

      // Loop through each image URL in the item's imageUrls array
      item.imageUrls.forEach((url) => {
        // Create a new image element
        const img = new Image();

        // Set the source of the image element to the current URL
        img.src = url;

        // Add an onload event listener to the image
        img.onload = () => {
          // Increment the imagesLoaded counter when an image loads successfully
          imagesLoaded += 1;

          // If all images have loaded, set isImagesLoaded to true
          if (imagesLoaded === item.imageUrls.length) {
            setIsImagesLoaded(true);
          }
        };

        // Add an onerror event listener to the image
        img.onerror = () => {
          // Increment the imagesLoaded counter even if an image fails to load
          imagesLoaded += 1;

          // If all images have loaded (or failed to load), set isImagesLoaded to true
          if (imagesLoaded === item.imageUrls.length) {
            setIsImagesLoaded(true);
          }
        };
      });
    },
    // Specify item.imageUrls as a dependency of the useEffect hook
    // This means the useEffect block will run whenever item.imageUrls changes
    [item.imageUrls]
  );
  const { handleDeleteListing } = useShowListing();
  return isImagesLoaded ? (
    <div className="max-w-[24rem] mx-auto  hover:opacity-90 overflow-hidden bg-white rounded-lg shadow-md hover:shadow-2xl">
      <Link to={`/update-listing/${item._id}`}>
        <div className="">
          <img
            className="w-full h-48 object-cover"
            src={typeof item.imageUrls[0] === "string" ? item.imageUrls[0] : ""}
            alt={item.name}
          />
        </div>
      </Link>
      <div className="p-4">
        <h4 className="text-2xl font-semibold text-blue-gray-700">
          {item.name}
        </h4>
        <p className="mt-3 flex flex-wrap gap-2 text-base font-normal text-gray-600">
          <Info size={20} /> {item.description}
        </p>
        <h5 className="flex flex-wrap text-sm gap-3 text-blue-gray-700">
          <Home size={20} />
          {item.address.split("").slice(0, 25).join("")}
        </h5>

        <h6 className="flex flex-wrap text-sm gap-3 text-blue-gray-700">
          <ArrowRight size={20} />
          {item.roomType.toUpperCase()}
        </h6>
      </div>
      <div className="flex items-center justify-between  p-5 bg-gray-100">
        <div className="flex items-center gap-2">
          <span>Price </span>
          <span className="line-through">
            ₹{item.specifications.regularPrice}
          </span>
          <span>₹{item.specifications.discountedPrice}</span>
        </div>
        <span>
          <Trash
            onClick={() => {
              setShowModal(true);
            }}
          />
        </span>
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDelete={() => handleDeleteListing(item?._id || "")}
        title={"You are Permanently deleting this Listing! "}
      />
    </div>
  ) : (
    <div className="w-[20rem] h-[20rem] sm:h-[25rem] md:h-[30rem]overflow-hidden bg-white rounded-lg shadow-md hover:shadow-2xl"></div>
  );
};

export default SingleList;
