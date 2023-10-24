import { Field, useFormikContext } from "formik";
import React from "react";
import useListing, {
  ListingFormDataType,
} from "../../hooks/Listing/useListing";
import { LABELS } from "../../constants/labels";

const ListingImagesUpload = () => {
  const { setFiles, handleImagesSubmit } = useListing();
  const { values, setFieldValue } = useFormikContext<ListingFormDataType>();
  return (
    <div className="flex flex-col m-3 text-white flex-1 gap-5">
      <p className="font-bold">
        {LABELS.IMAGE}
        <span className="font-semibold text-indigo-100">
          {LABELS.LISTING_IMG_UPLOAD_WARNING}
        </span>
      </p>
      <div className="flex flex-row w-full gap-2 mt-3">
        <Field
          type="file"
          name="images"
          accept="image/*"
          placeholder="images"
          unselectable="off"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) setFiles(e.target.files);
          }}
          className="p-3 text-sm  border border-gray-100  rounded-lg w-full"
        />
        <button
          title="upload photos"
          type="button"
          onClick={(e) => handleImagesSubmit(e, values, setFieldValue)}
          className="border-2 uppercase bg-white font-bold border-green-800 text-black  p-3 rounded hover:shadow-lg disabled:opacity-50 "
        >
          {LABELS.UPLOAD}
        </button>
      </div>
      <button className="p-3 hover:bg-white hover:shadow-lg hover:text-black bg-slate-900 text-white font-bold uppercase rounded-lg">
        {LABELS.CREATE_LIST}
      </button>
    </div>
  );
};

export default ListingImagesUpload;
