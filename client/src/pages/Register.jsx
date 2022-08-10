import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCredentials } from "../store/authSlice";
import { useRegisterMutation } from "../api/apiSlice";

import Page from "./Page";

import {
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setUsername("");
      setPassword("");
      navigate(from);
    } catch (error) {
      console.log(error);
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
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
          <Button
            disabled={!(username && password && email)}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            REGISTER
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Already have an account? &nbsp;
                <Link to={"/login"}>Login</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};

export default Register;
