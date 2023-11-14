import { FaSearch } from "react-icons/fa";
import useHeaderSearch from "../../hooks/useHeaderSearch";

const HeaderSearch = () => {
  const { setSearchText, handleSearch } = useHeaderSearch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search....."
        onChange={(e) => setSearchText(e.target.value)}
        className="bg-transparent focus:outline-none w-24 h-5 md:w-64 "
      />
      <button type="submit">
        <FaSearch className="text-black" onClick={handleSearch} />
      </button>
    </div>
  );
};

export default HeaderSearch;
