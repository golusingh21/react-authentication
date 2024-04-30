import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { authLogout } from "../../Redux/Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Grid, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { handleToggle } from "../../Redux/Slices/AppSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  /**
   * @FETCH_REDUX_DATA
   * Below code is used to fetch data from redux
   */
  const { currentUser } = useSelector((state) => {
    return {
      currentUser: state.auth?.isAuth,
    };
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * @LOGOUT_USER
   * Below method is used to clear the session and after that user will be redirect on the login page
   */
  const handleLogout = () => {
    handleClose();
    dispatch(authLogout());
    navigate("/");
  };

  /**
   * @TOGGLER
   * Below method is used to toggle the sidebar on the mobile device
   */
  const handleAppToggle = () => {
    dispatch(handleToggle());
  };

  return (
    <AppBar position="static">
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={9} sm={3}>
                <Stack direction="row" gap={2} className="logo-box">
                    <Typography variant="h6" component="div">
                        Logo
                    </Typography>
                    <IconButton onClick={handleAppToggle}>
                        <MenuIcon />
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item xs={3} sm={9} textAlign="right">
                <Stack
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <Stack className="user-box">
                        <Typography variant="h4">{currentUser?.name}</Typography>
                        <Typography>{currentUser?.email}</Typography>
                    </Stack>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        className="user-icon"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                    <Box className="user-box-mobile">
                        <Typography variant="h4">{currentUser?.name}</Typography>
                        <Typography>{currentUser?.email}</Typography>
                    </Box>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Stack>
            </Grid>
        </Grid>
    </AppBar>
  );
}