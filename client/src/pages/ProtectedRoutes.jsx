import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/dist/query";

import { setCredentials } from "../store/authSlice";
import { useRefreshTokenQuery } from "../api/apiSlice";

import { CircularProgress } from "@mui/material";

const ProtectedRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { isLoading, data, isSuccess } = useRefreshTokenQuery(
    undefined,
    !token && skipToken
  );

  useEffect(() => {
    dispatch(setCredentials({ ...data }));
  }, [data]);

  let content;

  if (isLoading) {
    content = <CircularProgress />;
  } else if (token || isSuccess) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
};

export default ProtectedRoutes;
