import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";
import { ListingDataType } from "../../hooks/Listing/useListing";

const ListingRoomType = () => {
  const { values, handleChange } = useFormikContext<ListingDataType>();
  return (
    <div className="rounded-lg p-2">
      <h1 className="font-bold"> Room Type</h1>
      <div className="flex gap-2">
        <Field
          name="roomType"
          type="radio"
          value="furnished"
          className="w-5"
          onChange={handleChange}
          checked={values.roomType === "furnished"}
        />
        <span>{LABELS.FULL}</span>
      </div>
      <div className="flex gap-2">
        <Field
          name="roomType"
          type="radio"
          value="semifurnished"
          className="w-5"
          onChange={handleChange}
          checked={values.roomType === "semi-furnished"}
        />
        <span>{LABELS.SEMI}</span>
      </div>
      <div className="flex gap-2">
        <Field
          name="roomType"
          type="radio"
          value="unfurnished"
          className="w-5"
          onChange={handleChange}
          checked={values.roomType === "un-furnished"}
        />
        <span>{LABELS.NOT}</span>
      </div>
    </div>
  );
};

export default ListingRoomType;
