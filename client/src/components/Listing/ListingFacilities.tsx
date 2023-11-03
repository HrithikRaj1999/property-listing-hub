import { useFormikContext } from "formik";
import Creatable from "react-select/creatable";

import useListing, { ListingDataType } from "../../hooks/Listing/useListing";

const ListingFacilities = () => {
  const { setFieldValue, initialValues } = useFormikContext<ListingDataType>();

  const { handleChangeOfSelect, facilityOptions } = useListing();
  // Define the options for the react-select component
  const defaultDisplayData = initialValues?.facilities?.map((item) => {
    return { label: item, value: item };
  });
  const availableOptions = facilityOptions.filter(
    (item) => !initialValues?.facilities.includes(item.value)
  );

  return (
    <div className="flex gap-1  p-4 rounded-xl mb-3 text-black text-[0.8rem] sm:text-md flex-col">
      <label className="font-bold text-sm sm:text-lg">Facilities</label>
      <Creatable
        isMulti
        name="facilities"
        options={availableOptions}
        defaultValue={defaultDisplayData}
        onChange={(e) => handleChangeOfSelect(e, setFieldValue)}
        className="flex-1 text-sm sm:text-[1rem]"
      />
    </div>
  );
};

export default ListingFacilities;
