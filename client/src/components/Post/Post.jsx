import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { useDeletePostMutation } from '../../store/postApiSlice';

import EditPost from './EditPost';

import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const Post = ({ user, message, created, roomId, postId, createdBy }) => {
  const formatted = dayjs(created).format('MMM D, YYYY | h:mm A');
  const userId = useSelector((state) => state.auth.user._id);

  const [anchorElm, setAnchorElm] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(false);

  const [deletePost, { isLoading, isSuccess }] = useDeletePostMutation();

  const settingsCloseHandler = async () => {
    setAnchorElm(null);
    setSettingsOpen(false);
  };

  const settingsClickHandler = (e) => {
    setAnchorElm(e.currentTarget);
    setSettingsOpen(true);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {!editingPost ? (
        <>
          <Card variant='outlined' sx={{ mb: '1rem' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: '#1976D2' }}>{user.charAt(0)}</Avatar>
              }
              action={
                userId === createdBy && (
                  <Tooltip title='Settings'>
                    <IconButton
                      aria-label='Settings'
                      onClick={settingsClickHandler}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                )
              }
              title={<Typography variant='subtitle2'>{user}</Typography>}
              subheader={formatted}
            />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                {message}
              </Typography>
            </CardContent>
          </Card>

          <Menu
            anchorEl={anchorElm}
            open={settingsOpen}
            onClose={() => {
              setAnchorElm(null);
              setSettingsOpen(false);
            }}
          >
            <MenuItem
              id='joinRoom'
              onClick={(e) => {
                e.preventDefault();
                settingsCloseHandler();
                setEditingPost(true);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              id='createRoom'
              onClick={async () => {
                settingsCloseHandler();
                await deletePost({ postId, roomId });
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </>
      ) : (
        <EditPost
          setEditingPost={setEditingPost}
          roomId={roomId}
          postId={postId}
          message={message}
        />
      )}
    </>
  );
};

export default React.memo(Post);
