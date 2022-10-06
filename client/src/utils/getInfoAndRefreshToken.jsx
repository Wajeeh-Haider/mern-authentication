import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, getDataAndRefreshToken } from "../actions";

const getInfoAndRefreshToken = () => {
  const { error, myData } = useSelector((state) => state?.getMyInfoReducer);
  const { error: refreshError, myData: refreshData } = useSelector(
    (state) => state?.refreshTokenReducer
  );
  let firstRender = true;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndRefreshData = async () => {
      if (firstRender) {
        dispatch(accessToken());
        firstRender = false;
      } else {
        return;
      }
      let interval = setInterval(() => {
        dispatch(getDataAndRefreshToken());
      }, 13 * 60 * 1000);

      return () => {
        clearInterval(interval);
      };
    };
    fetchAndRefreshData();
  }, [dispatch]);

  const refAndCurrentData = refreshData?.user ? refreshData?.user : myData;
  return refAndCurrentData;
};

export default getInfoAndRefreshToken;
