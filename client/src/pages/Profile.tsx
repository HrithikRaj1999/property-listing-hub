import { LogOut, UserX } from "react-feather";
import useProfile from "../hooks/useProfile";

export const Profile = () => {
  const { currentUser, fileRef, handlePicClick, handlePicUpload, formData } =
    useProfile();
  return (
    <div className=" max-w-sm min-w-fit p-5 mx-auto  flex flex-col  gap-5  ">
      <h1 className="text-3xl font-bold text-center my-4">Profile</h1>
      <div className="flex justify-center">
        <input
          title="choose-profile-pic"
          ref={fileRef}
          hidden={true}
          id="choose-profile-pic"
          type="file"
          onChange={handlePicUpload}
        />
        <img
          className={`rounded-full w-[150px] h-[150px] align-items-center object-cover`}
          alt="profile-pic"
          title="Click to change"
          onClick={handlePicClick}
          src={formData ? formData.avatar : currentUser?.avatar}
        />
        {/* {fileUploadError?<span>{fileUploadError.error}</span>:filePercentage<0 && filePercentage>100?<span>File Uploaded {filePercentage} %</span> */}
      </div>
      <form id="profile-form" className="flex flex-col gap-5">
        <input
          className="bg-indigo-50 border p-3 rounded-lg"
          id="name"
          title="name"
          value={currentUser?.username}
          placeholder="new name"
          onChange={() => {}}
        ></input>
        <input
          className=" bg-indigo-50 border p-3 rounded-lg"
          id="email"
          value={currentUser?.email}
          title="email"
          placeholder="new email"
          onChange={() => {}}
        ></input>
        <div className="relative">
          <input
            className="bg-indigo-50 border p-3 w-full rounded-lg"
            // type={state.passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={""}
            onChange={(e) => {}}
          />
          <span
            className="absolute inset-y-0 right-5 flex items-center text-black"
            onClick={() => {}}
          >
            {/* {state.passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />} */}
          </span>
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
        >
          Update
        </button>
        <button
          type="button"
          className="bg-green-800 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
        >
          Create Listing
        </button>
      </form>
      <div className="min-w-fit max-w-sm flex justify-between">
        <button
          type="button"
          className=" text-sm hover:shadow-sm hover:bg-red-600 hover:text-white  hover:text-md rounded-full flex gap-3 p-2"
          onClick={() => {}}
        >
          {" "}
          <UserX />
          Delete Account{" "}
        </button>
        <button
          type="button"
          className=" text-sm hover:shadow-sm hover:bg-red-600 hover:text-white  hover:text-md rounded-full flex gap-3 p-2"
          onClick={() => {}}
        >
          <LogOut />
          Sign out
        </button>
      </div>
    </div>
  );
};
