import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        {/*These are Private Route Sign in or Login is Must */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
