import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import InfoCard from './InfoCard'
import Place from '@mui/icons-material/Place';
import Storage from '@mui/icons-material/Storage';
import MenuOpen from '@mui/icons-material/MenuOpen';
import Construction from '@mui/icons-material/Construction';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';

const drawerWidth = 240;

function SideBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                {['Datasets', 'Models', 'Visualization'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 ? <Storage /> : null}
                                {index === 1 ? <Construction /> : null}
                                {index === 2 ? <Place /> : null}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <div class="p-4">
            </div>
            <div onClick={handleDrawerToggle}>
                <MenuOpen /><Button sx={{ fontWeight: 'bold', fontSize: 18 }} className="scaleX(-1)">Menu Bar</Button>
            </div>
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

            <div class="col md-2 p-4">
                <Box sx={{
                    width: "95%",
                    
                    
                }}>
                    <Typography sx={{ fontSize: 24, mb: 1.5 }} color="#0000b3" align="center">Top Datasets</Typography>
                    
                    <InfoCard ago="3" data_info="Sample data info1" uploader_name="Uploader X" user_score="9.9" />
                    <InfoCard ago="1" data_info="Sample data info2" uploader_name="Uploader Y" user_score="7.9" />
                    <InfoCard ago="11" data_info="Sample data info3" uploader_name="Uploader Z" user_score="4" />
                </Box>
            </div>
        </>
    );
}



export default SideBar;