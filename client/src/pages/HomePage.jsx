import React from "react";
import Cards from "../components/Cards";
import MainHero from "../components/MainHero";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, getDataAndRefreshToken, logout } from "../actions";
import ReactLoading from "react-loading";
axios.defaults.withCredentials = true;

const HomePage = () => {
  const [users, setUser] = React.useState();
  const myInfo = useSelector((state) => state.myInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  let firstRenders = true;

  const sendRequests = () => {
    dispatch(accessToken());
    setUser(myInfo.myData?.user);
    if (dispatch.type === "CHANGE_PASSWORD_FAILURE") {
      dispatch(logout());
      Navigate("/");
    }
  };

  const refreshToken = () => {
    dispatch(getDataAndRefreshToken());
    setUser(myRefreshData?.myData?.user);
  };

  React.useEffect(() => {
    if (firstRenders) {
      firstRenders = false;
      sendRequests();
    }
  }, []);

  React.useEffect(() => {
    let interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000); // 14 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MainHero users={users} />
      <Cards />
    </>
  );
};

export default HomePage;
