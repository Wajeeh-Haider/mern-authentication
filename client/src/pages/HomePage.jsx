import React from "react";
import Cards from "../components/Cards";
import MainHero from "../components/MainHero";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, getDataAndRefreshToken, logout } from "../actions";
import ReactLoading from "react-loading";
axios.defaults.withCredentials = true;

const HomePage = () => {
  const [users, setUser] = React.useState([]);
  const myInfo = useSelector((state) => state.myInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  let firstRenders = true;

  const sendRequests = () => {
    dispatch(accessToken());
    setUser(myInfo?.myData?.user);
    if (myInfo.error === 400 || myInfo.error === 404) {
      dispatch(logout());
      Navigate("/timeout");
    }
  };

  const refreshToken = () => {
    dispatch(getDataAndRefreshToken());
    setUser(myInfoRefresh?.myData.user);
    if (myInfoRefresh.error === 400 || myInfoRefresh.error === 404) {
      dispatch(logout());
      Navigate("/timeout");
    }
  };

  React.useEffect(() => {
    if (firstRenders) {
      firstRenders = false;
      sendRequests();
    }
  }, [firstRenders, dispatch, Navigate]);

  React.useEffect(() => {
    let interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000); // 14 minutes
    return () => clearInterval(interval);
  }, [firstRenders, dispatch, Navigate]);

  if (myInfo?.loading) {
    return (
      <ReactLoading
        type="bubbles"
        color="#1976D2"
        height="5%"
        width="5%"
        className="loader"
      />
    );
  }

  return (
    <>
      <MainHero users={users} />
      <Cards />
    </>
  );
};

export default HomePage;
