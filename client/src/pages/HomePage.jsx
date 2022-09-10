import React from "react";
import Cards from "../components/Cards";
import MainHero from "../components/MainHero";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions";
axios.defaults.withCredentials = true;

const HomePage = () => {
  const [users, setUser] = React.useState();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  let firstRender = true;
  const sendRequests = async () => {
    const res = await axios
      .get("http://127.0.0.1:4000/api/getmyinfo", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        Navigate("/timeout");
        dispatch(logout());
        console.log(err);
      });
    const data = await res.data;
    return data;
  };

  const refreshToken = async () => {
    const res = await axios
      .get("http://127.0.0.1:4000/api/refresh", {
        withCredentials: true,
        credentials: "include",
      })
      .catch((err) => {
        Navigate("/timeout");
        dispatch(logout());

        console.log(err);
      });
    if (!res) return Navigate("/");
    const data = await res.data;
    return data;
  };

  React.useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequests().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 60 * 29); // 29 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar users={users} />
      <MainHero users={users} />
      <Cards />
    </>
  );
};

export default HomePage;
