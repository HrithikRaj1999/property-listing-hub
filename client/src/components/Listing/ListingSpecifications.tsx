import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import { LABELS } from "../../constants/labels";
import { ListingDataType } from "../../hooks/Listing/useListing";

const ListingSpecifications = () => {
  const { values, handleChange } = useFormikContext<ListingDataType>();
  return (
    <div className="border-2 border-black rounded-lg p-2">
      <label className="font-bold  text-lg sm:text-xl ">
        {LABELS.SPECIFICATIONS}
      </label>
      <div className="flex gap-1 p-2 rounded-md  text-[0.8rem] sm:text-[0.9rem] flex-wrap">
        <div className="flex mx-3 gap-1">
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
        <ErrorMessage
          name="specifications.bedrooms"
          className="text-red-600"
          component="div"
        />

        <div className="flex mx-3 gap-1">
          <Field
            placeholder="1"
            type="number"
            name="specifications.bathroom"
            required
            className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.BATHROOMS}</span>
          <ErrorMessage
            name="specifications.bathroom"
            className="text-red-600"
            component="div"
          />
        </div>
        <div className="flex mx-3 gap-1">
          <Field
            placeholder="1"
            type="number"
            name="specifications.hall"
            required
            className="rounded-sm w-7 sm:w-10 md:w-14 border p-1 text-black  border-gray-400"
            onChange={handleChange}
          />
          <span>{LABELS.HALL}</span>
          <ErrorMessage
            name="specifications.hall"
            className="text-red-600"
            component="div"
          />
        </div>
        <div className="flex  mx-3  gap-1">
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
        <div className="flex  mx-3  gap-1">
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
    </div>
  );
};

export default ListingSpecifications;
