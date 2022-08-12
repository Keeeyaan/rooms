import { useState } from "react";
import dayjs from "dayjs";

import { useDeletePostMutation } from "../../store/postApiSlice";

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
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post = ({ user, message, created, roomId, postId }) => {
  const formatted = dayjs(created).format("MMM D, YYYY | h:mm A");

  const [anchorElm, setAnchorElm] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
    return console.log("loading...");
  } else if (isSuccess) {
    return console.log("success...");
  }

  return (
    <>
      <Card variant="outlined" sx={{ mb: "1rem" }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: "red" }}></Avatar>}
          action={
            <Tooltip title="Settings">
              <IconButton aria-label="Settings" onClick={settingsClickHandler}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          }
          title={<Typography variant="subtitle2">{user}</Typography>}
          subheader={formatted}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
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
          id="joinRoom"
          onClick={() => {
            settingsCloseHandler();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          id="createRoom"
          onClick={async () => {
            settingsCloseHandler();
            await deletePost({ postId, roomId });
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default Post;
