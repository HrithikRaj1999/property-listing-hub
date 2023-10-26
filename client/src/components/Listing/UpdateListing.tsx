import { Formik, Form, FormikValues } from "formik";

import _ from "lodash";
import {
  ListingDataType,
  validationSchema,
} from "../../hooks/Listing/useListing";
import ListingType from "./ListingType";
import ListingInformation from "./ListingInformation";
import ListingFacilities from "./ListingFacilities";
import ListingRoomType from "./ListingRoomType";
import ListingSpecifications from "./ListingSpecifications";
import ListingImageProperty from "./ListingImageProperty";
import ViewSelectedImages from "./ViewSelectedImages";
import Spinner from "../Spinner";
import useShowListing from "../../hooks/useShowListing";
import useUpdateListing from "../../hooks/Listing/useUpdateListing";
import { LABELS } from "../../constants/labels";

const UpdateListing = () => {
  const {
    currentUser,
    initialFormikData,
    handleUpdate,
    updatedPictureList,
    handleChangeOfSelect,
  } = useUpdateListing();
  return (
    <Formik
      initialValues={initialFormikData as FormikValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        const { setFieldValue } = formikHelpers;
        formikHelpers.setSubmitting(true);
        handleUpdate(values as ListingDataType, setFieldValue);
        formikHelpers.setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, errors }) => {
        return (
          <div className="p-1 max-w-4xl gap-3 min-w-[375px] mx-auto h-full">
            <h1 className="text-3xl font-bold text-center my-11">
              {LABELS.CREATE_LISTING_HEADING}
            </h1>
            <div className="border">
              <ListingType />
              <Form
                id="listing-create"
                className="flex flex-col gap-2 sm:flex-row   p-2 rounded-full "
              >
                <div className="flex flex-col  text-black  flex-1">
                  <ListingInformation />
                  <ListingFacilities />
                  <ListingRoomType />
                </div>
                <div className="flex flex-col  gap-2 flex-1">
                  <div className="flex flex-col  rounded-md text-black flex-1 gap-5">
                    <ListingSpecifications />
                    {values?.imageUrls?.length < 6 ? (
                      <ListingImageProperty />
                    ) : null}
                    <ViewSelectedImages />
                  </div>
                  <button
                    type="submit"
                    className="p-3 hover:bg-white hover:shadow-lg hover:text-black bg-slate-900 text-white font-bold uppercase rounded-lg"
                  >
                    {isSubmitting ? <Spinner /> : LABELS.UPDATE}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default UpdateListing;
