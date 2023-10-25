import { useFormikContext } from "formik";
import React from "react";
import useListing, {
  ListingFormDataType,
} from "../../hooks/Listing/useListing";

const ViewSelectedImages = () => {
  const { values, setFieldValue } = useFormikContext<ListingFormDataType>();
  const { updatedPictureList } = useListing();
  return (
    <>
      <div className="flex  flex-wrap gap-2">
        {Array.from(values.imageUrls).map((file, index) => {
          const imgUrl = URL.createObjectURL(file);
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
