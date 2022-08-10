import { useState } from "react";
import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { useRefreshTokenQuery } from "../api/apiSlice";

const PersistLogin = () => {
  const location = useLocation();
  const [skip, setSkip] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const { isLoading, data, isSuccess, isError } = useRefreshTokenQuery({
    skip,
  });

  useEffect(() => {
    const verifyRefreshToken = () => {
      setSkip(true);
      dispatch(setCredentials({ ...data }));
      setSkip(false);
    };
    !token && verifyRefreshToken();
  }, []);

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess || token) {
    content = <Outlet />;
  } else if (isError) {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
};

export default PersistLogin;
