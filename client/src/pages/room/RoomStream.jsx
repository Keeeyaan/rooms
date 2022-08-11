import { useState } from "react";
import { useParams } from "react-router-dom";

import Page from "../Page";
import { useGetSingleRoomQuery } from "../../store/roomApiSlice";

import RoomHeader from "../../components/UI/RoomHeader";
import Post from "../../components/Post/Post";

import { Container } from "@mui/system";
import {
  Card,
  CardActionArea,
  TextField,
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

const RoomStream = () => {
  const { id } = useParams();
  const [clickPost, setClickPost] = useState(false);
  const [post, setPost] = useState("");

  const { data, isLoading } = useGetSingleRoomQuery(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(post);
    setPost("");
  };
  return (
    <Page title={`${data.title} |`} maxWidth="lg">
      <RoomHeader data={data} />
      <Container maxWidth="md">
        <Card sx={{ mb: 4 }}>
          {clickPost ? (
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{ mx: 3, mt: 2 }}
            >
              <TextField
                variant="filled"
                multiline
                minRows={4}
                onChange={(e) => setPost(e.target.value)}
                label="Announce something to your room"
                value={post}
                fullWidth
              />
              <Box
                component="div"
                sx={{
                  my: 2.5,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => setClickPost(false)}>Cancel</Button>
                <Button
                  type="submit"
                  sx={{ ml: 2 }}
                  disabled={!post}
                  variant="contained"
                >
                  Post
                </Button>
              </Box>
            </Box>
          ) : (
            <CardActionArea onClick={() => setClickPost(true)}>
              <Avatar />
              <Typography variant="caption" color="text.secondary">
                Announce something to your room
              </Typography>
            </CardActionArea>
          )}
        </Card>
        <Post />
      </Container>
    </Page>
  );
};

export default RoomStream;
