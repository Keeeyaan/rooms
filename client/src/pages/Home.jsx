import { Link } from "react-router-dom";

import { useGetAllUserRoomsQuery } from "../store/roomApiSlice";
import Page from "./Page";

import RoomCard from "../components/UI/RoomCard";
import { Grid } from "@mui/material";

const Home = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllUserRoomsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <Page title="">
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          sx={{ marginTop: "2rem" }}
        >
          {data.map((currRoom) => (
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
  } else if (isError) {
    content = <p>No room found!</p>;
  }

  return content;
};

export default Home;
