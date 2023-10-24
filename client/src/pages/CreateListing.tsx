import ListingFacilities from "../components/Listing/ListingFacilities";
import ListingInformation from "../components/Listing/ListingInformation";
import ListingSpecifications from "../components/Listing/ListingSpecifications";
import ListingType from "../components/Listing/ListingType";
import PropertyImagesUpload from "../components/Listing/ListingImagesUpload";
import useListing from "../hooks/Listing/useListing";
import { Field, Formik } from "formik";
import { Label } from "@headlessui/react/dist/components/label/label";
import { LABELS } from "../constants/labels";
const CreateListing = () => {
  const { validationSchema, inititalFormikData } = useListing();
  return (
    <Formik
      enableReinitialize={true}
      initialValues={inititalFormikData}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => {
        console.log(values);
        return (
          <div className="p-3 max-w-4xl min-w-[375px] mx-auto">
            <h1 className="text-3xl font-bold text-center my-11">
              {LABELS.CREATE_LISTING_HEADING}
            </h1>
            <form
              name="listing-form"
              className="flex flex-col sm:flex-row gap-20 m-2 p-14 rounded-lg bg-slate-500"
            >
              <div className="flex flex-col text-white gap-4 flex-1">
                <ListingInformation />
                <div className="flex gap-6  text-white  text-[0.8rem] sm:text-md  flex-col">
                  <ListingType />
                  <ListingFacilities />
                  <ListingSpecifications />
                </div>
              </div>
              <PropertyImagesUpload />
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default CreateListing;
