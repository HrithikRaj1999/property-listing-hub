import { Field, useFormikContext } from "formik";
import React from "react";

const ListingType = () => {
  const { handleChange } = useFormikContext();
  return (
    <div className="m-3 flex flex-wrap justify-start gap-2">
      <div className="flex gap-2 ">
        <Field
          name="type"
          type="radio"
          value="sell"
          placeholder="sell"
          className="w-5 "
          onChange={handleChange}
        />
        <span>Sell House</span>
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
        <span>Rent House</span>
      </div>
    </div>
  );
};

export default ListingType;
