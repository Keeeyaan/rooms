import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 8, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        ROOMS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
