import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { setCredentials } from "../store/authSlice";
import { useRefreshTokenQuery } from "../api/apiSlice";

const PersistLogin = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  //todo: refactor the persist logic
  const { isLoading, data, isSuccess } = useRefreshTokenQuery(
    !token ?? skipToken
  );

  useEffect(() => {
    dispatch(setCredentials({ ...data }));
  }, [data]);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess || token) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
};

export default PersistLogin;
