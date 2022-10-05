import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import MainHero from "../components/MainHero";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  accessToken,
  getDataAndRefreshToken,
  logout,
  logoutUser,
} from "../actions";
import ReactLoading from "react-loading";
import Pusher from "pusher-js";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [users, setUser] = useState([]);
  const [pusherUser, setpusherUser] = useState([]);
  const myInfo = useSelector((state) => state.getMyInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const Location = useLocation();
  let firstRender = true;

  const getData = () => {
    dispatch(accessToken()).then(() => {
      const get = JSON.parse(localStorage.getItem("persist:Auth"));
      const data = JSON.parse(get.getMyInfoReducer);
      myInfo.myData == null ? setUser(data?.myData) : setUser(myInfo?.myData);
    });

    if (myInfo.error === 400 || myInfo.error === 404) {
      dispatch(logout());
      dispatch(logoutUser());
      Navigate("/timeout");
    }
  };

  const getInfoAndRefreshToken = () => {
    dispatch(getDataAndRefreshToken()).then(() => {
      if (myInfoRefresh.error === 400 || myInfoRefresh.error === 404) {
        dispatch(logout());
        dispatch(logoutUser());
        Navigate("/timeout");
      } else {
        setUser(myInfoRefresh.myData.user);
      }
    });
  };
  useEffect(() => {
    getData();
    let interval = setInterval(() => {
      getInfoAndRefreshToken();
    }, 1000 * 60 * 13); // 13 minutes
    return () => clearInterval(interval);
  }, [Location, Navigate]);

  useEffect(() => {
    const pusher = new Pusher("dc54355a02fdd703dc39", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("updateUser");
    channel.bind("updated", (data) => {
      setpusherUser(data);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [pusherUser]);

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
      <MainHero users={users} PusherUser={pusherUser} />
      <Cards />
    </>
  );
};

export default HomePage;
