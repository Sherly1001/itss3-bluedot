import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ConstanthPathEnum } from '../../constanth/constanth.path';
import { Input } from 'antd';
import { useState } from 'react';
import { getSearchRoute } from '../../ultis/route';
import Navigation from '../Navigation/Navigation';
const { Search } = Input;

function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");
        setAnchorEl(null);
        navigate(ConstanthPathEnum.HOME_PAGE);
    };

    const [searchInput, setSearchInput] = useState<string>("");

    const handleSearchChange = (e: any) => {
        setSearchInput(e.target.value);
    }

    const handleSearch = () => {
        console.log(searchInput);
        navigate(getSearchRoute(searchInput));
        setSearchInput("");
    }

    return (
        <>
            <AppBar position="static" color='primary'>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ padding: "0 10px", justifyContent: "space-between" }}>
                        <Typography
                            variant="h6"
                            component="div"
                        >
                            <NavLink to={ConstanthPathEnum.HOME_PAGE} style={{ color: '#e91e63', fontSize: '20px', fontWeight: '700' }}>
                                Blue Dot
                            </NavLink>
                        </Typography>
                        <Box sx={{ width: "70%" }}>
                            <Search
                                placeholder="検索 ..."
                                enterButton="検索"
                                size="large"
                                value={searchInput}
                                onChange={handleSearchChange}
                                onPressEnter={handleSearch}
                                onSearch={handleSearch}
                            />
                        </Box>
                        {localStorage.getItem('token') ? (
                            <Box>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Typography variant="h6" sx={{ color: '#e91e63', fontSize: '20px', fontWeight: '700' }}>
                                        {localStorage.getItem('username')}
                                    </Typography>
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
                                    <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <NavLink to={ConstanthPathEnum.SIGN_IN}>
                                <Button sx={{ color: '#e91e63', fontSize: '20px', fontWeight: '700' }}>
                                    サインイン
                                </Button>
                            </NavLink>
                        )}
                    </Toolbar>
                </Container>
            </AppBar >
            <Navigation />
        </>
    );
};

export default Header;