import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { CookieProvider } from "./context/Cookie";
import { SearchedDataProvider } from "./context/SearchedData";

// Lazy loading components
const About = lazy(() => import("./pages/About"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ShowListings = lazy(() => import("./pages/ShowListings"));
const UpdateListing = lazy(() => import("./components/Listing/UpdateListing"));
const ShowSingleList = lazy(() => import("./pages/ShowSingleList"));
const Search = lazy(() => import("./components/Search/Search"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

function App() {
  return (
    <CookieProvider>
      <SearchedDataProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/show-listing/:listId" element={<ShowSingleList />} />
            <Route path="/search" element={<Search />} />
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/show-listings" element={<ShowListings />} />
              <Route path="/update-listing/:listId" element={<UpdateListing />} />
            </Route>
          </Routes>
        </Suspense>
      </SearchedDataProvider>
    </CookieProvider>
  );
}

export default App;
