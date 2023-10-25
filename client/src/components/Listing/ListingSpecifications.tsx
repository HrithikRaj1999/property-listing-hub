import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";
import { ListingFormDataType } from "../../hooks/Listing/useListing";

const ListingSpecifications = () => {
  const { values, handleChange } = useFormikContext<ListingFormDataType>();
  return (
    <div className="flex gap-1 border-2 border-black p-2 rounded-md  text-black text-[0.8rem] sm:text-[0.9rem] flex-col sm:flex-wrap">
      <label className="font-bold text-lg sm:text-xl ">Specifications:</label>
      <div className="flex mx-3 gap-1 items-center">
        <Field
          placeholder="1"
          type="number"
          name="specifications.bedrooms"
          required
          className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
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
          className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
          onChange={handleChange}
        />
        <span>{LABELS.BATHROOMS}</span>
      </div>
      <div className="flex  mx-3  gap-1 items-center">
        <Field
          placeholder="1"
          type="number"
          name="specifications.hall"
          required
          className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
          onChange={handleChange}
        />
        <span>{LABELS.HALL}</span>
      </div>
      <div className="flex  mx-3  gap-1 items-center">
        <div className="flex flex-col">
          <Field
            placeholder="1"
            type="number"
            name="specifications.regularPrice"
            required
            className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <ErrorMessage
            name="specifications.regularPrice"
            className="text-red-600"
            component="div"
          />
        </div>
        <div className="flex flex-col">
          <span>{LABELS.REGULAR_PRICE}</span>
          {values.type === "rent" ? (
            <span>{LABELS.REGULAR_PRICE_SUB}</span>
          ) : null}
        </div>
      </div>
      <div className="flex  mx-3  gap-1 items-center">
        <div className="flex flex-col">
          <Field
            placeholder="1"
            type="number"
            name="specifications.discountedPrice"
            required
            className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <ErrorMessage
            name="specifications.discountedPrice"
            className="text-red-600"
            component="div"
          />
        </div>

        <div className="flex flex-col">
          <span>{LABELS.DISCOUNT_PRICE}</span>
          {values.type === "rent" ? (
            <span>{LABELS.DISCOUNT_PRICE_SUB}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListingSpecifications;
