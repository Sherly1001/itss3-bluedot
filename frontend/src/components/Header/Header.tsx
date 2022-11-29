import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;

function Header(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <NavLink to={"/"} style={{ width: '100%', color: '#333' }}>
                            <ListItemText primary={"Home"} sx={{ width: '100%' }} />
                        </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <NavLink to={"/products"} style={{ width: '100%', color: '#333' }}>
                            <ListItemText primary={"Prodcts"} sx={{ width: '100%' }} />
                        </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <NavLink to={"/categories"} style={{ width: '100%', color: '#333' }}>
                            <ListItemText primary={"Categories"} sx={{ width: '100%' }} />
                        </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <NavLink to={"/sign-in"} style={{ width: '100%', color: '#333' }}>
                            <ListItemText primary={"Sign In"} sx={{ width: '100%' }} />
                        </NavLink>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <NavLink to={"/sign-up"} style={{ width: '100%', color: '#333' }}>
                            <ListItemText primary={"Sign Up"} sx={{ width: '100%' }} />
                        </NavLink>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Blue Dot
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            borderRight: '1px solid #fff',
                            pr: 2
                        }}
                    >
                        <NavLink to={'/'}>
                            <Button sx={{ color: '#fff' }}>
                                Home
                            </Button>
                        </NavLink>
                        <NavLink to={'/products'}>
                            <Button sx={{ color: '#fff' }}>
                                Products
                            </Button>
                        </NavLink>
                        <NavLink to={'/categories'}>
                            <Button sx={{ color: '#fff' }}>
                                Categories
                            </Button>
                        </NavLink>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, paddingLeft: 2 }}>
                        <NavLink to={'/sign-in'}>
                            <Button sx={{ color: '#fff' }}>
                                Sign In
                            </Button>
                        </NavLink>
                        <NavLink to={'/sign-up'}>
                            <Button sx={{ color: '#fff' }}>
                                Sign Up
                            </Button>
                        </NavLink>
                    </Box>
                </Toolbar>
                <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;