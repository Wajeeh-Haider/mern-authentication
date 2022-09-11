import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import "animate.css";
import Error from "./pages/Error";
import SignupPage from "./pages/SignupPage";
import SessionTimeout from "./pages/SessionTimeout";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  const isLogged = useSelector((state) => state.authReducer);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {isLogged.isAuthenticated ? (
          <Route path="/home" element={<HomePage />} />
        ) : null}
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/timeout" element={<SessionTimeout />} />
        <Route path="/verify/:verifyId" element={<VerifyEmail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
