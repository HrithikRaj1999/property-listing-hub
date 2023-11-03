import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";
import { ListingDataType } from "../../hooks/Listing/useListing";

const ListingRoomType = () => {
  const { values, handleChange } = useFormikContext<ListingDataType>();
  return (
    <div className=" shadow rounded-lg p-3 flex flex-col sm:flex-row  gap-3">
      <h1 className="font-bold"> Room Type</h1>
      <div className="flex gap-2">
        <Field
          name="roomType"
          type="radio"
          value="furnished"
          className="w-5"
          onChange={handleChange}
        />
        <span>{LABELS.FULL}</span>
      </div>
      <div className="flex gap-2">
        <Field
          name="roomType"
          type="radio"
          value="semi-furnished"
          className="w-5"
          onChange={handleChange}
        />
        <span>{LABELS.SEMI}</span>
      </div>
      <div className="flex gap-2">
        <Field
          name="roomType"
          type="radio"
          value="un-furnished"
          className="w-5"
          onChange={handleChange}
        />
        <span>{LABELS.NOT}</span>
      </div>
    </div>
  );
};

export default ListingRoomType;
