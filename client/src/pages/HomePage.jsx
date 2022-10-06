import React from "react";
import Cards from "../components/Cards";
import MainHero from "../components/MainHero";
import { useSelector, useDispatch } from "react-redux";
import getInfoAndRefreshToken from "../utils/getInfoAndRefreshToken";
import { useNavigate } from "react-router-dom";
import { logout, logoutUser } from "../actions";

const HomePage = () => {
  const refreshAndCurrentData = getInfoAndRefreshToken();
  const myInfo = useSelector((state) => state?.getMyInfoReducer);
  const refreshInfo = useSelector((state) => state?.refreshTokenReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  if (
    myInfo.error === 400 ||
    myInfo.error === 404 ||
    refreshInfo.error === 400 ||
    refreshInfo.error === 404
  ) {
    dispatch(logout());
    dispatch(logoutUser());
    Navigate("/timeout");
  }
  return (
    <>
      <MainHero myData={refreshAndCurrentData} />
      <Cards />
    </>
  );
};

export default HomePage;
