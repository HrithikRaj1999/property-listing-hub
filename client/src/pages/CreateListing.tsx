import ListingFacilities from "../components/Listing/ListingFacilities";
import ListingInformation from "../components/Listing/ListingInformation";
import ListingSpecifications from "../components/Listing/ListingSpecifications";
import ListingType from "../components/Listing/ListingType";
import useListing from "../hooks/Listing/useListing";
import { Formik, Form } from "formik";
import { LABELS } from "../constants/labels";
import ViewSelectedImages from "../components/Listing/ViewSelectedImages";
import ListingImageProperty from "../components/Listing/ListingImageProperty";
import Spinner from "../components/Spinner";
import _ from "lodash";
import ListingRoomType from "../components/Listing/ListingRoomType";
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
                    {values.imageUrls.length < 6 ? (
                      <ListingImageProperty />
                    ) : null}
                    <ViewSelectedImages />
                  </div>
                  <button
                    type="submit"
                    className="p-3 hover:bg-white hover:shadow-lg hover:text-black bg-slate-900 text-white font-bold uppercase rounded-lg"
                  >
                    {isSubmitting ? <Spinner /> : LABELS.CREATE_LIST}
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

export default CreateListing;
