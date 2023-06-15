
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import './scsc_style.css'
import AuthenticationButton from './authentication-button';

const options = [
    'Admin Login',
    'User Login',
    'Logout'
];

const ITEM_HEIGHT = 48;

function Top_Menubar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>

            <AppBar>
                <Toolbar>
                    <Typography variant="h4" color="inherit" component="div">
                        <b>SCSC</b>
                    </Typography>
                    <IconButton edge="start" aria-label="more" id="long-button" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleClick} sx={{ marginLeft: "auto" }} >
                        <AccountCircleIcon sx={{ color: "white" }} />
                    </IconButton>

                    <Menu id="long-menu" MenuListProps={{ 'aria-labelledby': 'long-button', }}
                        onClose={handleClose}
                        keepMounted
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: '20ch' } }} >
                        <MenuItem><AuthenticationButton /></MenuItem>
                    
                    
                    </Menu>
                    




                </Toolbar>

            </AppBar>

        </>
    );
}

export default Top_Menubar;
