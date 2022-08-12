import { useState } from "react";
import { useParams } from "react-router-dom";

import Page from "../Page";
import { useGetSingleRoomQuery } from "../../store/roomApiSlice";
import { useCreatePostMutation } from "../../store/postApiSlice";
import { useGetAllPostsQuery } from "../../store/postApiSlice";

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
  const { data: postData, isLoading: postLoading } = useGetAllPostsQuery(id);

  const [createPost, { isError }] = useCreatePostMutation();

  if (isLoading || postLoading) {
    return <p>Loading...</p>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    await createPost({ post, id }).unwrap();
    setPost("");
    setClickPost(false);
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
                <Button type="button" onClick={() => setClickPost(false)}>
                  Cancel
                </Button>
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
            <Box onClick={() => setClickPost(true)}>
              <CardActionArea
                sx={{
                  display: "flex",
                  height: "4rem",
                  width: "auto",
                  ml: "2rem",
                }}
              >
                <Avatar />
                <Typography variant="caption" color="text.secondary" ml="1rem">
                  Announce something to your room
                </Typography>
              </CardActionArea>
            </Box>
          )}
        </Card>
        {postData
          .map((post) => (
            <Post
              key={post._id}
              user={post.username}
              message={post.message}
              created={post.createdAt}
              roomId={id}
              postId={post._id}
            />
          ))
          .reverse()}
      </Container>
    </Page>
  );
};

export default RoomStream;
