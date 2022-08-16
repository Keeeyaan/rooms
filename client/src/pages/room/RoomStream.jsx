import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Container,
  Button,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import { useGetSingleRoomQuery } from '../../store/roomApiSlice';
import { useGetAllPostsQuery } from '../../store/postApiSlice';

import Page from '../Page';
import RoomNav from '../../components/UI/RoomNav';
import RoomHeader from '../../components/UI/RoomHeader';
import Post from '../../components/Post/Post';
import CreatePost from '../../components/Post/CreatePost';

const RoomStream = () => {
  const { id } = useParams();
  const [clickPost, setClickPost] = useState(false);

  const { data, isLoading } = useGetSingleRoomQuery(id);
  const { data: postData, isLoading: postLoading } = useGetAllPostsQuery(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (postLoading) {
    return <CircularProgress />;
  }

  return (
    <Page title={`${data.title} |`} maxWidth='lg'>
      <RoomNav id={id} />
      <IconButton size='small' component={Link} to='/'>
        <CancelIcon />
      </IconButton>
      <RoomHeader data={data} />
      <Container maxWidth='md'>
        <Card sx={{ mb: 4 }}>
          {clickPost ? (
            <CreatePost id={id} setClickPost={setClickPost} />
          ) : (
            <Box onClick={() => setClickPost(true)}>
              <CardActionArea
                sx={{
                  display: 'flex',
                  height: '4rem',
                  width: 'auto',
                  ml: '2rem',
                }}
              >
                <Avatar />
                <Typography variant='caption' color='text.secondary' ml='1rem'>
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
              createdBy={post.createdBy}
            />
          ))
          .reverse()}
      </Container>
    </Page>
  );
};

export default RoomStream;
