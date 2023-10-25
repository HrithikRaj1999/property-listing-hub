import { ErrorMessage, Field, useFormikContext } from "formik";
import { ListingFormDataType } from "../../hooks/Listing/useListing";
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
    className="bg-indigo-50 text-black border p-2 w-full rounded-lg"
  />
));

const ListingInformation = () => {
  const { values, handleChange, errors, setFieldValue, setFieldError } =
    useFormikContext<ListingFormDataType>();
  return (
    <div className="border-2 p-4 rounded-xl mb-3 border-black">
      <label className="text-sm font-bold">Name</label>
      <Field
        name="name"
        type="text"
        placeholder="name"
        maxLength={23}
        required
        onChange={handleChange}
        className="bg-indigo-50 text-black border p-2 w-full rounded-lg"
      />
      <ErrorMessage name="name" className="text-red-600" component="div" />
      <label className="text-sm font-bold">Address</label>
      <Field
        name="address"
        type="text"
        placeholder="address"
        required
        onChange={handleChange}
        className="bg-indigo-50 text-black before:border p-3 w-full rounded-lg"
      />
      <ErrorMessage name="address" className="text-red-600" component="div" />
      <label className="text-sm font-bold">Phone Number</label>
      <PhoneInput
        placeholder="Enter phone number"
        value={values.phone}
        onChange={(e) => setFieldValue("phone", e?.toString())}
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
        className="bg-indigo-50  text-black border p-3 w-full rounded-lg"
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
