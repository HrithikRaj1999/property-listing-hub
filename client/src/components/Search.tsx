import { Field, Form, Formik } from "formik";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col sm:flex-col md:flex-row">
      <div className="p-7  sm:max-w-sm border-b-4 sm:border-r-4 md:border-r-4 sm:min-h-screen">
        <Formik initialValues={{ searchText: "" }} onSubmit={() => {}}>
          <Form>
            <div className="flex items-center gap-5  ">
              <label className="whitespace-nowrap">Search Text: </label>
              <Field
                name="searchText"
                type="text"
                placeholder="Search..."
                className="p-3 rounded-lg w-full"
              />
            </div>
            {/*Sort */}
            <div className="flex my-4 flex-wrap  gap-4">
              <label>Sort:</label>
              <select id="sort_order" className="rounded-md p-2">
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>oldest</option>
              </select>
            </div>
            {/* Types of offer and rent and sale*/}
            <div className="flex flex-col my-4 gap-5">
              <label>Type:</label>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-3">
                  <Field name="rent-and-sale" type="checkbox" value="rent-and-sale" />
                  <label>Rent & sale </label>
                </div>
                <div className="flex items-center gap-3">
                  <Field name="rent" type="checkbox" value="rent" />
                  <label>Rent </label>
                </div>
                <div className="flex items-center gap-3">
                  <Field name="sale" type="checkbox" value="sale" />
                  <label>sale </label>
                </div>
                <div className="flex items-center gap-3">
                  <Field name="offer" type="checkbox" value="offer" />
                  <label>Offers </label>
                </div>
              </div>
            </div>
            {/*Room Types furnished unfurnished*/}
            <div className="flex flex-col my-4 gap-5">
              <label>Room Type: </label>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-3">
                  <Field name="roomType" type="radio" value="furnished" />
                  <label>Furnished</label>
                </div>
                <div className="flex items-center gap-3">
                  <Field name="roomType" type="radio" value="semi-furnished" />
                  <label>Semi-Furnished</label>
                </div>
                <div className="flex items-center gap-3">
                  <Field name="roomType" type="radio" value="un=furnished" />
                  <label>Un-Furnished</label>
                </div>
              </div>
            </div>
            {/*Benefits facilities with room and flat*/}
            <div className="flex flex-col my-4 gap-5">
              <label>Amenities: </label>
              <div className="flex flex-wrap gap-5">
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.PARKING_SPOT" value="parking-spot" />
                  Parking Spot
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.POOL" value="swimming-pool" />
                  Swimming Pool
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.SECURITY" value="security" />
                  Security
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.POWER_BACKUP" value="power-backup" />
                  Power Backup
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.WATER_SUPPLY" value="water-supply" />
                  24/7 Water Supply
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.ELEVATORS" value="elevators" />
                  Elevators
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.GYM" value="gym" />
                  Gymnasium
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.PLAYGROUND" value="playground" />
                  Playground
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.COMMUNITY_HALL" value="com-hall" />
                  Community Hall
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.GARDENS" value="gardens" />
                  Landscaped Gardens
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.CAR_PARKING" value="parking" />
                  Car Parking
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.WASTE_DISPOSAL" value="disposal" />
                  Waste Disposal
                </div>
                <div className="flex items-center gap-3">
                  <Field type="checkbox" name="amenities.FIRE_SAFETY" value="fire-safety" />
                  Fire Safety
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="">Listing Items</div>
    </div>
  );
};

export default Search;
