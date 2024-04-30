import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/GridView';
import ProductIcon from '@mui/icons-material/AutoAwesomeMotion';
import CategoryIcon from '@mui/icons-material/Category';
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { isToggle } = useSelector((state) => {
        return {
          isToggle: state.app?.isToggle,
        };
    });
    return(
        <Paper className={`app-sidebar ${isToggle && "active-sidebar"}`}>
            <MenuList>
                <NavLink 
                    to='/'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </NavLink>
                <NavLink 
                    to='/products'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <ListItemIcon>
                        <ProductIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Product</ListItemText>
                </NavLink>
                <NavLink 
                    to='/categories'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    <ListItemIcon>
                        <CategoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Category</ListItemText>
                </NavLink>
            </MenuList>
            <Box className={`side-overlay ${isToggle && "overlay-active"}`}></Box>
        </Paper>
    )
}
export default Sidebar;