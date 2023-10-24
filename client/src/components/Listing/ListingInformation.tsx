import { ErrorMessage, Field, useFormikContext } from "formik";

const ListingInformation = () => {
  const { handleChange } = useFormikContext();
  return (
    <div className="border-2 p-4 rounded-xl mb-3 border-black">
      <label className="text-base font-bold">Name</label>
      <Field
        name="name"
        type="text"
        placeholder="name"
        maxLength={62}
        minLength={10}
        required
        onChange={handleChange}
        className="bg-indigo-50 text-black border p-2 w-full rounded-lg"
      />
      <ErrorMessage name="name" className="text-red-600" component="div" />
      <label className="text-base font-bold">Address</label>
      <Field
        name="address"
        type="text"
        placeholder="address"
        required
        onChange={handleChange}
        className="bg-indigo-50 text-black before:border p-3 w-full rounded-lg"
      />
      <ErrorMessage name="name" className="text-red-600" component="div" />
      <label className="text-base font-bold">Description</label>
      <Field
        name="description"
        as="textarea"
        placeholder="description"
        required
        onChange={handleChange}
        className="bg-indigo-50  text-black border p-3 w-full rounded-lg"
      />
      <ErrorMessage name="name" className="text-red-600" component="div" />
    </div>
  );
};

export default ListingInformation;
