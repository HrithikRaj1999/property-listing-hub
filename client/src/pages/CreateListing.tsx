import useListing from "../hooks/Listing/useListing";

const CreateListing = () => {
  const { setFiles, handleImagesSubmit } = useListing();
  return (
    <div className="p-3 max-w-4xl min-w-[375px] mx-auto">
      <h1 className="text-3xl font-bold text-center my-11">
        Create a listing of property
      </h1>
      <form
        id="listing-form"
        className="flex flex-col sm:flex-row gap-20 m-2 p-14 rounded-lg bg-slate-500"
      >
        <div className="flex flex-col text-white gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="name"
            maxLength={62}
            minLength={10}
            required
            className="bg-indigo-50 text-black border p-3 w-full rounded-lg"
          />{" "}
          <input
            id="address"
            type="text"
            placeholder="address"
            required
            className="bg-indigo-50 text-black before:border p-3 w-full rounded-lg"
          />
          <textarea
            id="description"
            placeholder="description"
            required
            className="bg-indigo-50  text-black border p-3 w-full rounded-lg"
          />
          <div className="flex gap-6 items-center text-white  text-sm  flex-wrap">
            <div className="flex gap-2 ">
              <input
                id="sell"
                type="checkbox"
                placeholder="sell"
                className="w-5 "
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                id="rent"
                type="checkbox"
                placeholder="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input
                id="parking-spot"
                type="checkbox"
                placeholder="parking-spot"
                className="w-5"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                id="furnished"
                type="checkbox"
                placeholder="Furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                id="offer"
                type="checkbox"
                placeholder="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap text-white text-sm gap-3">
            <div className="flex gap-2 items-center">
              <input
                placeholder="1"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="rounded-lg border p-2 text-black  border-gray-400"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                placeholder="1"
                type="number"
                id="baths"
                min="1"
                max="10"
                required
                className="rounded-lg border p-2 text-black  border-gray-400"
              />
              <span>Bathrooms</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                placeholder="1"
                type="number"
                id="regular-price"
                min="1"
                max="10"
                required
                className="rounded-lg border p-2 text-black border-gray-400"
              />
              <div className="flex flex-col">
                <span>Regular Price</span>
                <span>(Rs/ month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                placeholder="1"
                type="number"
                id="discounted-price"
                min="1"
                max="10"
                required
                className="rounded-lg border p-2 text-black border-gray-400"
              />
              <div className="flex flex-col">
                <span>Discount Price</span>
                <span>(Rs/ month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col m-3 text-white flex-1 gap-5">
          <p className="font-bold">
            Images:
            <span className="font-semibold text-indigo-100">
              The first image will be the cover (max 6 allowed)
            </span>
          </p>
          <div className="flex flex-row w-full gap-2 mt-3">
            <input
              type="file"
              id="images"
              accept="image/*"
              placeholder="images"
              unselectable="off"
              multiple
              onChange={(e) => {
                if (e.target.files) setFiles(e.target.files);
              }}
              className="p-3 text-sm  border border-gray-100  rounded-lg w-full"
            />
            <button
              title="upload photos"
              type="button"
              onClick={handleImagesSubmit}
              className="border-2 uppercase bg-sky-600 font-bold border-green-800 text-black-700  p-3 rounded hover:shadow-lg disabled:opacity-50 "
            >
              Upload
            </button>
          </div>
          <button className="p-3 hover:bg-white hover:shadow-lg hover:text-black bg-slate-600 text-white font-bold uppercase rounded-lg">
            Create List
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
