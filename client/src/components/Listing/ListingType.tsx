import { Field, useFormikContext } from "formik";
import React from "react";

const ListingType = () => {
  const { handleChange } = useFormikContext();
  return (
    <div className="flex flex-wrap justify-start gap-2">
      <label>Type:</label>
      <div className="flex gap-2 ">
        <Field
          name="type"
          type="radio"
          value="sell"
          placeholder="sell"
          className="w-5 "
          onChange={handleChange}
        />
        <span>Sell</span>
      </div>
      <div className="flex gap-2">
        <Field
          name="type"
          type="radio"
          value="rent"
          placeholder="rent"
          className="w-5"
          onChange={handleChange}
        />
        <span>Rent</span>
      </div>
    </div>
  );
};

export default ListingType;
