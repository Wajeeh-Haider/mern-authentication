import React from "react";
import Cards from "../components/Cards";
import MainHero from "../components/MainHero";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, logoutUser } from "../actions";

const HomePage = () => {
  const myInfo = useSelector((state) => state?.getMyInfoReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  if (myInfo.error === 400 || myInfo.error === 404) {
    dispatch(logout());
    dispatch(logoutUser());
    Navigate("/timeout");
  }
  return (
    <>
      <MainHero />
      <Cards />
    </>
  );
};

export default HomePage;
