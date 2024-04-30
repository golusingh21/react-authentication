import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Grid, Box } from '@mui/material';
import './Layout.Style.scss'

const AppLayout = ({children}) => {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Header/>
            <Grid 
                container
                className='app-layout'
            >
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
            <Sidebar/>
        </Box>
    )
}
export default AppLayout;