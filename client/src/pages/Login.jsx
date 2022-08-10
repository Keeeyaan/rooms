import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../store/authSlice";
import { useLoginMutation } from "../api/apiSlice";

import Page from "./Page";

import {
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Checkbox,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate(from);
    } catch (error) {
      throw new Error("ERROR");
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Page maxWidth="xs" title="Login">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "82vh",
        }}
      >
        <Avatar sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={!(email && password)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOGIN
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item xs>
              <Link to={"/"} variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Typography variant="body2">
                Don't have an account? &nbsp;
                <Link to={"/register"}>Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};

export default Login;
