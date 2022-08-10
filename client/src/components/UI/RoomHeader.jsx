import React from "react";

import { Paper, Box, Grid, Typography, Divider } from "@mui/material";

const RoomHeader = () => {
  return (
    <Paper
      sx={{
        mt: 3,
        height: 240,
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${"https://source.unsplash.com/random"})`,
      }}
    >
      <Grid container>
        <Grid item>
          <Box
            sx={{
              position: "relative",
              ml: 4,
              mt: 12,
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" mb={1}>
              Cool
            </Typography>
            <Typography variant="h6" color="inherit" mb={1}>
              Cool Room
            </Typography>
            <Typography variant="body1">18aSDCPE</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoomHeader;
