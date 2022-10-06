import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import "animate.css";
import Error from "./pages/Error";
import SignupPage from "./pages/SignupPage";
import SessionTimeout from "./pages/SessionTimeout";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./pages/MyProfile";
import "./App.css";
import Navbar from "./components/Navbar";

console.log(import.meta.env);
const App = () => {
  const isLogged = useSelector((state) => state.authReducer);
  return (
    <>
      {isLogged.isAuthenticated ? (
        <>
          <Navbar />
        </>
      ) : null}
      <Routes>
        {isLogged.isAuthenticated ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/me" element={<MyProfile />} />
          </>
        ) : null}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/timeout" element={<SessionTimeout />} />
        <Route path="/verify/:verifyId" element={<VerifyEmail />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
