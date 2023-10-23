const CreateListing = () => {
  return (
    <div className="p-3 max-w-4xl min-w-[375px] mx-auto">
      <h1 className="text-3xl font-bold text-center my-11">
        Create a listing of property
      </h1>
      <form id="listing-form" className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="name"
            maxLength={62}
            minLength={10}
            required
            className="bg-indigo-50 border p-3 w-full rounded-lg"
          />{" "}
          <input
            id="address"
            type="text"
            placeholder="address"
            required
            className="bg-indigo-50 border p-3 w-full rounded-lg"
          />
          <textarea
            id="description"
            placeholder="description"
            required
            className="bg-indigo-50 border p-3 w-full rounded-lg"
          />
          <div className="flex gap-6 items-center  flex-wrap">
            <div className="flex gap-2 ">
              <input
                id="sell"
                type="checkbox"
                placeholder="sell"
                className="w-5"
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
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 items-center">
              <input
                placeholder="1"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="rounded-lg border p-2 border-gray-400"
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
                className="rounded-lg border p-2 border-gray-400"
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
                className="rounded-lg border p-2 border-gray-400"
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
                className="rounded-lg border p-2 border-gray-400"
              />
              <div className="flex flex-col">
                <span>Discount Price</span>
                <span>(Rs/ month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col m-3 flex-1 gap-5">
          <p className="font-bold">
            Images:
            <span className="font-semibold text-slate-500">
              The first image will be the cover (max 6 allowed)
            </span>
          </p>
          <div className="flex flex-row w-full gap-4 mt-3">
            <input
              type="file"
              id="images"
              accept="images/*"
              placeholder="images"
              className="p-3 border border-gray-600  w-full"
            />
            <button
              title="upload photos"
              type="button"
              className="border-2 uppercase border-green-800 text-black-700  p-3 rounded hover:shadow-lg disabled:opacity-50 "
              //  onClick={()=>handleListingPicUpload()}
            >
              Upload
            </button>
          </div>
          <button className="p-3 hover:bg-slate-900 hover:shadow-lg bg-slate-700 text-white font-bold uppercase rounded-lg">
            Create List
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
