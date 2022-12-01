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
import { NavLink, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { red } from '@mui/material/colors';

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
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        setAnchorEl(null);
        navigate("/");
    };

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
        <AppBar position="static" color='primary'>
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
                            pr: 2
                        }}
                    >
                        <NavLink to={'/'}>
                            <Button sx={{ color: '#fff' }}>
                                ホーム
                            </Button>
                        </NavLink>
                        <NavLink to={'/products'}>
                            <Button sx={{ color: '#fff' }}>
                                製品
                            </Button>
                        </NavLink>
                        <NavLink to={'/categories'}>
                            <Button sx={{ color: '#fff' }}>
                                カテゴリー
                            </Button>
                        </NavLink>
                    </Box>
                    {localStorage.getItem('token') ? (
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, paddingLeft: 2 }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>プロフィール</MenuItem>
                                <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ display: { xs: 'none', sm: 'block' }, paddingLeft: 2 }}>
                            <NavLink to={'/sign-in'}>
                                <Button sx={{ color: '#fff' }}>
                                    サインイン
                                </Button>
                            </NavLink>
                        </Box>
                    )}
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
        </AppBar >
    );
};

export default Header;