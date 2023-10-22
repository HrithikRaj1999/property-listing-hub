import { LogOut, UserX } from "react-feather";
import CustomModal from "../components/CustomModal";
import Spinner from "../components/Spinner";
import { LABELS } from "../constants/labels";
import useModal from "../hooks/profile/useModal";
import useProfile from "../hooks/profile/useProfile";
export const Profile = () => {
  const { openModal, closeModal, modalConditions } = useModal();
  const {
    currentUser,
    fileRef,
    state,
    loading,
    profilePic,
    passwordShowIcon,
    handlePicClick,
    handlePicUpload,
    handleInputChange,
    handleUpdateSubmit,
    handlePassView,
    handleUserDelete,
    handleSignOut,
  } = useProfile();
  return (
    <>
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
            className={`rounded-full w-[200px] h-[200px] align-items-center object-cover`}
            alt="profile-pic"
            title="Click to change"
            onClick={handlePicClick}
            src={profilePic}
          />
        </div>
        <form
          id="profile-form"
          className="flex flex-col gap-5"
          onSubmit={handleUpdateSubmit}
        >
          <input
            className="bg-indigo-50 border p-3 rounded-lg"
            id="username"
            title="name"
            defaultValue={currentUser?.username}
            placeholder="new name"
            onChange={handleInputChange}
          ></input>
          <input
            className=" bg-indigo-50 border p-3 rounded-lg"
            id="email"
            defaultValue={currentUser?.email}
            title="email"
            placeholder="new email"
            onChange={handleInputChange}
          ></input>
          <div className="relative">
            <input
              className="bg-indigo-50 border p-3 w-full rounded-lg"
              type={state.passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Password"
              defaultValue=""
              onChange={handleInputChange}
            />
            <span
              className="absolute inset-y-0 right-5 flex items-center text-black"
              onClick={handlePassView}
            >
              {passwordShowIcon}
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
          >
            {loading ? <Spinner /> : "Update"}
          </button>
          <button
            type="button"
            className="bg-green-800 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-75"
          >
            {LABELS.CREATE_LISTING}
          </button>
        </form>
        <div className="min-w-fit max-w-sm flex justify-between">
          <button
            type="button"
            title="Delete Account"
            className=" text-sm hover:shadow-sm hover:bg-red-600 hover:text-white  hover:rounded-xl hover:text-md flex gap-3 p-2"
            onClick={() =>
              openModal(
                "Warning : You are Deleting the Account permanently",
                handleUserDelete
              )
            }
          >
            <UserX />
            {LABELS.DELETE_USER}
          </button>
          <button
            type="button"
            className=" text-sm hover:shadow-sm hover:bg-red-600 hover:text-white  hover:text-md  hover:rounded-xl flex gap-3 p-2"
            onClick={() => openModal("Sign out", handleSignOut)}
          >
            <LogOut />
            {LABELS.SIGN_OUT}
          </button>
        </div>
      </div>
      <CustomModal
        isOpen={modalConditions.isOpen}
        onClose={closeModal}
        title={modalConditions.title}
        onDelete={modalConditions.handler}
      />
    </>
  );
};
