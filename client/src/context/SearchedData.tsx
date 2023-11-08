import React, { useState, useContext, createContext } from "react";
import { itemType } from "../hooks/useShowListing";
interface SearchProviderProps {
  children: React.ReactNode;
}
interface SearchContextType {
  searchedLisitingData: itemType[];
  setSearchedLisitingData: React.Dispatch<React.SetStateAction<itemType[]>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
const SearchContext = createContext<SearchContextType>({} as SearchContextType);

export const SearchedDataProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const data = localStorage.getItem("formik values") || "";
  const initVal = data ? JSON.parse(data).filteredListings : [];
  const [searchedLisitingData, setSearchedLisitingData] = useState<itemType[]>([...initVal]);
  const [searchText, setSearchText] = useState("");
  return (
    <SearchContext.Provider
      value={{ searchedLisitingData, setSearchedLisitingData, searchText, setSearchText }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const useSearchData = () => useContext(SearchContext);
