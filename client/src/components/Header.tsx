import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LABELS } from "../constants/labels";
import { RootState } from "../redux/store";

const Header = () => {
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  return (
    <header className="bg-slate-200 shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4 ">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
          <span className="text-slate-500">Property</span>
          <span className="text-slate-800">Hub</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search....."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-500" />
        </form>
        <ul className="flex gap-4 font-medium items-center  ">
          <Link to="/">
            {" "}
            <li className="hidden sm:inline text-slate-700 hover:underline hover:font-bold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline hover:font-bold">
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                alt="profile"
                title="profile-pic"
                src={currentUser.avatar}
                className="rounded-full  h-10 w-10 object-cover"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <li className=" sm:inline text-slate-700 hover:underline hover:font-bold">
                {LABELS.SIGN_IN}
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
