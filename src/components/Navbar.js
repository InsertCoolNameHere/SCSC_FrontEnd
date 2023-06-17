import * as React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
} from './NavbarElements';
import Drawer from '@mui/material/Drawer';
import Home from '@mui/icons-material/Home';
import Place from '@mui/icons-material/Place';
import Storage from '@mui/icons-material/Storage';
import Help from '@mui/icons-material/Help';
import School from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuOpen from '@mui/icons-material/MenuOpen';
import Construction from '@mui/icons-material/Construction';
import Cable from '@mui/icons-material/Cable';
import Assessment from '@mui/icons-material/Assessment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import PublicIcon from '@mui/icons-material/Public';
import '../index.css';

const drawerWidth = 240;
  
function Navbar(props) {
  const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                <ListItemButton component="a" href="/scsc">
                    <ListItemText primary="SCSC" />
                    <PublicIcon />
                </ListItemButton>
                <ListItemButton component="a" href="/tutorial">
                    <ListItemText primary="Tutorial" />
                    <School />
                </ListItemButton>
                <ListItemButton component="a" href="/profile">
                    <ListItemText primary="Profile" />
                    <AccountCircleIcon />
                </ListItemButton>
                <ListItemButton component="a" href="/help">
                    <ListItemText primary="Need Help?" />
                    <Help />
                </ListItemButton>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;



  return (
    <>
      <Nav>
        {/* <Bars /> */}
        {/* <SideBar /> */}
        <NavMenu>
        
        
          <Drawer/>
          <NavLink onClick={handleDrawerToggle} activeStyle>
          <MenuOpen />
        Menu
        </NavLink>
        <NavLink to='/'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <Home />
            Home
        </NavLink>
        <NavLink to='/datasets'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <Storage />
          Datasets
        </NavLink>
        <NavLink to='/models'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <Construction />
          Models
        </NavLink>
        <NavLink to='/visualization'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <Place />
          Visualization
        </NavLink>
        <NavLink to='/analysis'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <Assessment />
          Analysis
        </NavLink>
        <NavLink to='/api'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <Cable />
          API
        </NavLink>
        <NavLink to='/about'  className={({ isActive }) => (isActive ? 'active font-bold' : 'inactive')}>
        <InfoIcon />
          About
        </NavLink>
        </NavMenu>
      </Nav>
      <Drawer
        container={container}
        variant="temporary"
        sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        ModalProps={{
            keepMounted: false,
        }}
        open={mobileOpen}
        onClick={handleDrawerToggle}
    >
        {drawer}
    </Drawer>
    </>
  );
};
  
export default Navbar;