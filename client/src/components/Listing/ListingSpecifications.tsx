import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";

const ListingSpecifications = () => {
  const { handleChange } = useFormikContext();
  return (
    <div className="flex gap-2  border-2 border-black p-2 rounded-md  text-black text-[0.6rem] sm:text-xs flex-col">
      <label className="font-bold text-sm sm:text-lg ">Specifications:</label>
      <div className="flex flex-wrap sm:flex-col gap-1 ">
        <div className="flex mx-3 gap-1 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bedrooms"
            required
            className="rounded-sm w-10 sm:w-20 md:w-24 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.BEDROOMS}</span>
        </div>
        <div className="flex mx-3 gap-1 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bathroom"
            required
            className="rounded-sm w-10 sm:w-20 md:w-24 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.BATHROOMS}</span>
        </div>
        <div className="flex  mx-3  gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.hall"
            required
            className="rounded-sm w-10 sm:w-20 md:w-24 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.HALL}</span>
        </div>
        <div className="flex  mx-3  gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.regularPrice"
            required
            className="rounded-sm w-10 sm:w-20 md:w-24 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <span>{LABELS.REGULAR_PRICE}</span>
            <span>{LABELS.REGULAR_PRICE_SUB}</span>
          </div>
        </div>
        <div className="flex  mx-3  gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.discountedPrice"
            required
            className="rounded-sm w-10 sm:w-20 md:w-24 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <span>{LABELS.DISCOUNT_PRICE}</span>
            <span>{LABELS.DISCOUNT_PRICE_SUB}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingSpecifications;
