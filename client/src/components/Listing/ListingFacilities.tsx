import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";

const ListingFacilities = () => {
  const { handleChange } = useFormikContext();

  return (
    <div className="flex flex-col border p-2 rounded-md justify-start gap-2">
      <label className="font-bold text-sm sm:text-lg">Facilities:</label>
      <div className="flex flex-wrap gap-3 flex-row">
        <div className="flex  gap-2 ">
          <Field
            name="facilities.parkingSpot"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            // checked={formData.parking}
          />
          <span>{LABELS.PARKING}</span>
        </div>
        <div className="flex  gap-2 ">
          <Field
            name="facilities.swimmingPool"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            // checked={formData.parking}
          />
          <span>{LABELS.POOL}</span>
        </div>
        <div className="flex gap-2">
          <Field
            name="facilities.furnished"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            // checked={}
          />
          <span>{LABELS.FULL}</span>
        </div>
        <div className="flex gap-2">
          <Field
            name="facilites.semifurnished"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            // checked={}
          />
          <span>{LABELS.SEMI}</span>
        </div>
        <div className="flex gap-2">
          <Field
            name="facilities.unfurnished"
            type="checkbox"
            className="w-5"
            onChange={handleChange}
            // checked={}
          />
          <span>{LABELS.NOT}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingFacilities;
