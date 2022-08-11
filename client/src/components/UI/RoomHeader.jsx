import { Paper, Box, Grid, Typography } from "@mui/material";

const RoomHeader = ({ data }) => {
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
              {data.title}
            </Typography>
            <Typography variant="h6" color="inherit" mb={1}>
              {data.description}
            </Typography>
            <Typography variant="body1">{data.roomCode}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RoomHeader;
