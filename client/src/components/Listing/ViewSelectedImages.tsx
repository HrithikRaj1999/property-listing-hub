import { useFormikContext } from "formik";
import React from "react";
import useListing, { ListingDataType } from "../../hooks/Listing/useListing";

const ViewSelectedImages = () => {
  const { values, setFieldValue } = useFormikContext<ListingDataType>();
  const { updatedPictureList } = useListing();

  return (
    <>
      <div className="flex  flex-wrap gap-2">
        {values?.imageUrls &&
          Array.from(values?.imageUrls).map((file, index) => {
            const imgUrl =
              typeof file === "string" ? file : URL.createObjectURL(file); //TODO:: for update we are sendinging direct Url but for create we are storing FileList so this might cause error
            return (
              <div className="relative group flex gap-1 w-[5rem] sm:w-[8rem] h-[5rem] sm:h-[10rem] border-black rounded-lg">
                <img
                  key={index}
                  src={imgUrl}
                  alt={`img-${index}`}
                  className="  rounded-lg"
                />
                <div
                  className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                  onClick={() =>
                    setFieldValue("imageUrls", [
                      ...updatedPictureList(index, values),
                    ])
                  }
                >
                  <span key={index} className="text-white text-2xl">
                    X
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ViewSelectedImages;
