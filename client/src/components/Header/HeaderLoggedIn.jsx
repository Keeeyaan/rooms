import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../store/authSlice";

import {
  MenuItem,
  IconButton,
  Menu,
  Divider,
  Avatar,
  Tooltip,
  ListItemIcon,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

const HeaderLoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElm, setAnchorElm] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);

  const accountCloseHandler = () => {
    setAnchorElm(null);
    setAccountOpen(false);
  };

  const accountClickHandler = (e) => {
    setAnchorElm(e.currentTarget);
    setAccountOpen(true);
  };

  const roomCloseHandler = (e) => {
    setAnchorElm(null);
    setRoomOpen(false);
    if (e.target.id === "joinRoom") {
      return navigate("/join-room");
    }
    navigate("/create-room");
  };

  const roomClickHandler = (e) => {
    setAnchorElm(e.currentTarget);
    setRoomOpen(true);
  };

  return (
    <>
      <Tooltip title="Create or join Room">
        <IconButton
          id="account-button"
          size="large"
          onClick={roomClickHandler}
          color="inherit"
          sx={{ marginRight: "1rem" }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Account settings">
        <IconButton
          id="account-button"
          size="large"
          onClick={accountClickHandler}
          color="inherit"
        >
          <Avatar sx={{ width: 32, height: 32 }}>K</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorElm}
        open={roomOpen}
        onClose={() => {
          setAnchorElm(null);
          setRoomOpen(false);
        }}
      >
        <MenuItem id="joinRoom" onClick={roomCloseHandler}>
          Join Room
        </MenuItem>
        <MenuItem id="createRoom" onClick={roomCloseHandler}>
          Create Room
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorElm}
        open={accountOpen}
        onClose={accountCloseHandler}
      >
        <MenuItem onClick={accountCloseHandler}>
          <Avatar sx={{ width: 32, height: 32, marginRight: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={accountCloseHandler}>
          <Avatar sx={{ width: 32, height: 32, marginRight: 1 }} /> My Account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="sm" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(logOut());
            console.log("LOGOUT");
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="sm" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderLoggedIn;
