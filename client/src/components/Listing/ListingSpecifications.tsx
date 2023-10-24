import { Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";

const ListingSpecifications = () => {
  const { handleChange } = useFormikContext();
  return (
    <div className="flex gap-6  text-white  text-[0.6rem] sm:text-xs flex-col">
      <label className="font-bold text-sm sm:texyt">Specifications:</label>
      <div className="flex flex-wrap   text-white gap-3">
        <div className="flex mx-3 gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bedrooms"
            min="1"
            max="10"
            required
            className="rounded-lg border p-2  text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.BEDROOMS}</span>
        </div>
        <div className="flex mx-3  gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bathroom"
            min="1"
            max="10"
            required
            className="rounded-lg border p-2 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.BATHROOMS}</span>
        </div>
        <div className="flex  mx-3  gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.hall"
            min="1"
            max="5"
            required
            className="rounded-lg border p-2 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.HALL}</span>
        </div>
        <div className="flex  mx-3  gap-2 items-center">
          <Field
            placeholder="1"
            type="number"
            name="specifications.regularPrice"
            min="1"
            max="10"
            required
            className="rounded-lg border p-2 text-black border-gray-400"
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
            min="1"
            max="10"
            required
            className="rounded-lg border p-2 text-black border-gray-400"
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
