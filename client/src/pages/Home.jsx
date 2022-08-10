import { Link } from "react-router-dom";

import Page from "./Page";
import RoomCard from "../components/UI/RoomCard";
import { Grid } from "@mui/material";

const Home = () => {
  const rooms = [{ _id: "12312", title: "GAMER", description: "Coder" }];
  //todo: Loading state...
  return (
    <Page title="">
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        sx={{ marginTop: "2rem" }}
      >
        {rooms.map((currRoom) => (
          <Grid key={currRoom._id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/room/stream/${currRoom._id}`}>
              <RoomCard
                title={currRoom.title}
                description={currRoom.description}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

export default Home;
