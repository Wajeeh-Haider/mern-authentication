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
  const [users, setUser] = React.useState();
  const myInfo = useSelector((state) => state.myInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  let firstRenders = true;

  const sendRequests = () => {
    dispatch(accessToken());
    setUser(myInfo?.myData?.user);
  };

  const refreshToken = () => {
    dispatch(getDataAndRefreshToken());
    setUser(myInfoRefresh.myData.user);
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
    }, 4 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!users)
    return (
      <ReactLoading
        type="bubbles"
        color="#1976D2"
        height="5%"
        width="5%"
        className="loader"
      />
    );
  return (
    <>
      <MainHero users={users} />
      <Cards />
    </>
  );
};

export default HomePage;
