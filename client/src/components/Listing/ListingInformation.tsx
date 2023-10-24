import { ErrorMessage, Field, useFormikContext } from "formik";

const ListingInformation = () => {
  const { handleChange } = useFormikContext();
  return (
    <>
      <Field
        name="name"
        type="text"
        placeholder="name"
        maxLength={62}
        minLength={10}
        required
        onChange={handleChange}
        className="bg-indigo-50 text-black border p-3 w-full rounded-lg"
      />
      <ErrorMessage name="name" component="div" />

      <Field
        name="address"
        type="text"
        placeholder="address"
        required
        onChange={handleChange}
        className="bg-indigo-50 text-black before:border p-3 w-full rounded-lg"
      />
      <ErrorMessage name="address" component="div" />

      <Field
        name="description"
        as="textarea"
        placeholder="description"
        required
        onChange={handleChange}
        className="bg-indigo-50  text-black border p-3 w-full rounded-lg"
      />
      <ErrorMessage name="description" component="div" />
    </>
  );
};

export default ListingInformation;
