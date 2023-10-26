import { ErrorMessage, Field, useFormikContext } from "formik";
import { ListingDataType } from "../../hooks/Listing/useListing";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { InputHTMLAttributes, forwardRef, useEffect } from "react";

const CustomInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className=" text-black no-border p-2 w-full rounded-lg"
  />
));

const ListingInformation = () => {
  const { values, handleChange, errors, setFieldValue, setFieldError } =
    useFormikContext<ListingDataType>();
  return (
    <div className=" p-4 rounded-xl mb-3 -black">
      <label className="text-sm font-bold">Name</label>
      <Field
        name="name"
        type="text"
        placeholder="name"
        maxLength={23}
        required
        onChange={handleChange}
        className="border  text-black  p-2 w-full rounded-lg"
      />
      <ErrorMessage name="name" className="text-red-600" component="div" />
      <label className="text-sm font-bold">Address</label>
      <Field
        name="address"
        type="text"
        placeholder="address"
        required
        onChange={handleChange}
        className="border  text-black before: p-3 w-full rounded-lg"
      />
      <ErrorMessage name="address" className="text-red-600" component="div" />
      <label className="text-sm font-bold">Phone Number</label>
      <PhoneInput
        placeholder="Enter phone number"
        value={values.phone}
        defaultCountry="IN"
        onChange={(e) => setFieldValue("phone", e?.toString())}
        className="border  text-black p-1  w-full rounded-lg"
        inputComponent={CustomInput}
      />
      {errors.phone ? <div className="text-red-600">{errors.phone}</div> : null}

      <ErrorMessage name="phone" className="text-red-600" component="div" />
      <label className="text-sm font-bold">Description</label>
      <Field
        name="description"
        as="textarea"
        placeholder="description"
        required
        onChange={handleChange}
        className="border   text-black  p-3 w-full rounded-lg"
      />
      <ErrorMessage
        name="description"
        className="text-red-600"
        component="div"
      />
    </div>
  );
};

export default ListingInformation;
