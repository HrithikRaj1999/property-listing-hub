import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";
import { ListingFormDataType } from "../../hooks/Listing/useListing";

const ListingFacilities = () => {
  const { values, handleChange } = useFormikContext<ListingFormDataType>();

  return (
    <div className="flex gap-2 border-2 border-black p-4 rounded-xl mb-3  text-black  text-[0.8rem] sm:text-md  flex-col">
      <label className="font-bold text-sm sm:text-lg">Facilities</label>
      <div className="flex flex-wrap gap-3 flex-row">
        <div className="flex  gap-2 ">
          <Field
            name="facilities.parkingSpot"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            checked={values.facilities.parkingSpot}
          />

          <span>{LABELS.PARKING}</span>
        </div>
        <div className="flex  gap-2 ">
          <Field
            name="facilities.swimmingPool"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            checked={values.facilities.swimmingPool}
          />
          <span>{LABELS.POOL}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingFacilities;
