import { Home } from "react-feather";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LABELS } from "../constants/labels";
import { RootState } from "../redux/store";
import { useState, useEffect } from "react";
import { itemType } from "../hooks/useShowListing";
import api from "../config/customApi";
import { toast } from "react-toastify";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const fetchData = async () => {
    try {
      const { data } = await api.get(`listing/get-searched-item?${query.toString()}`);
      localStorage.setItem("searchedData", JSON.stringify([...data?.listings]));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchText", searchText);
    const searchQueryParams = urlParams.toString();
    navigate(`/search?${searchQueryParams}`);
  };
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  return (
    <header className="bg-zinc-800 shadow-lg min-w-[375px]">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <h1 className="font-bold text-sm sm:text-2xl flex items-center ">
          <span className="text-slate-100 flex items-center gap-2  ">
            <Home color="Green" size={30} />
            Property
          </span>
          <span className="text-blue-500">Hub</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search....."
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent focus:outline-none w-24 h-5 md:w-64 "
          />
          <button type="submit">
            <FaSearch className="text-black" onClick={async () => await fetchData()} />
          </button>
        </form>
        <ul className="flex gap-4 font-medium items-center">
          <Link to="/">
            <li className="hidden md:inline  text-slate-100 hover:underline hover:font-bold">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden md:inline text-slate-100 hover:underline hover:font-bold">
              About
            </li>
          </Link>
          {currentUser ? (
            <Link to="/profile">
              <img
                alt="profile"
                title="profile-pic"
                src={currentUser.avatar}
                className="rounded-full text-slate-100 h-10 w-10 object-cover"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <li className="text-slate-100 hover:underline hover:font-bold">{LABELS.SIGN_IN}</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
