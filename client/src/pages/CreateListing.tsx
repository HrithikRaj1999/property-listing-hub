import ListingFacilities from "../components/Listing/ListingFacilities";
import ListingInformation from "../components/Listing/ListingInformation";
import ListingSpecifications from "../components/Listing/ListingSpecifications";
import ListingType from "../components/Listing/ListingType";
import useListing, { ListingFormDataType } from "../hooks/Listing/useListing";
import { Formik, Form } from "formik";
import { LABELS } from "../constants/labels";
import ViewSelectedImages from "../components/Listing/ViewSelectedImages";
import ListingImageProperty from "../components/Listing/ListingImageProperty";
import Spinner from "../components/Spinner";
import _ from "lodash";
const CreateListing = () => {
  const { validationSchema, inititalFormikData, handleImagesSubmit } =
    useListing();

  return (
    <Formik
      initialValues={inititalFormikData}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        const { setFieldValue } = formikHelpers;
        formikHelpers.setSubmitting(true);
        handleImagesSubmit(values, setFieldValue);
        formikHelpers.setSubmitting(false);
      }}
    >
      {({ values, isSubmitting, errors }) => {
        return (
          <div className="p-3 max-w-4xl  min-w-[375px] mx-auto">
            <h1 className="text-3xl font-bold text-center my-11">
              {LABELS.CREATE_LISTING_HEADING}
            </h1>
            <Form
              id="listing-create"
              className="flex flex-col border-4 gap-7 sm:flex-row  m-2 p-3 rounded-xl "
            >
              <div className="flex flex-col  text-black gap-2 flex-1">
                <ListingInformation />
                <div className="flex gap-6 border-2 border-black p-4 rounded-xl mb-3  text-black  text-[0.8rem] sm:text-md  flex-col">
                  <ListingType />
                  <ListingFacilities />
                </div>
              </div>
              <div className="flex flex-col  gap-2 flex-1">
                <div className="flex flex-col  rounded-md text-white flex-1 gap-5">
                  <ListingSpecifications />
                  {values.imageUrls.length < 6 ? (
                    <ListingImageProperty />
                  ) : null}
                  <ViewSelectedImages />

                  <button
                    type="submit"
                    className="p-3 hover:bg-white hover:shadow-lg hover:text-black bg-slate-900 text-white font-bold uppercase rounded-lg"
                  >
                    {isSubmitting ? <Spinner /> : LABELS.CREATE_LIST}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default CreateListing;
