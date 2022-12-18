import { Box, Button, Container, Menu, MenuItem, Popover } from "@mui/material";
import { List } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ConstanthPathEnum } from "../../constanth/constanth.path";
import axiosInstance from "../../requests/axiosInstance";
import { Category } from "../../type/category";
import { getCategoyRoute } from "../../ultis/route";

// const categories: Category[] = [];

// for (var i = 0; i < 20; i++) {
//     const cat: Category = {
//         id: `book-${i}`,
//         name: `book ${i}`,
//         imageUrl: 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg',
//     }
//     categories.push(cat);
// }

function Navigation() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [adminEl, setAdminEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        axiosInstance.get('category')
        .then(res => setCategories(res.data.data));
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const hanldeAdminOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAdminEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdminClose = () => {
        setAdminEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Box sx={{ backgroundColor: "#e91e63", padding: "10px", width: "100%", position: "sticky", top: "0", zIndex: "9", opacity: "0.7" }}>
            <Container maxWidth="lg">
                <Box sx={{ display: "flex", gap: "10%", justifyContent: "flex-start", paddingLeft: "10px" }}>
                    <NavLink to={ConstanthPathEnum.HOME_PAGE}>
                        <Button sx={{ fontSize: "16px", fontWeight: "700" }}>ホーム</Button>
                    </NavLink>
                    <NavLink to={ConstanthPathEnum.PRODUCT_LIST}>
                        <Button sx={{ fontSize: "16px", fontWeight: "700" }}>プロダクト</Button>
                    </NavLink>
                    <Button
                        aria-describedby={id}
                        sx={{ fontSize: "16px", fontWeight: "700" }}
                        onClick={handleClick}
                    >
                        カテゴリー</Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        anchorPosition={{ top: 115, left: 600 }}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{ zIndex: "10" }}
                    >
                        <List
                            style={{ width: "700px", padding: "10px 0 0 20px" }}
                            grid={{ column: 4 }}
                            dataSource={categories}
                            size="large"
                            renderItem={(item: Category) => (
                                <List.Item style={{ padding: "0 10px", width: "150px" }}>
                                    <NavLink to={getCategoyRoute(item.name)} style={{ color: "#333", fontSize: "14px" }} onClick={handleClose}>
                                        {item.name}
                                    </NavLink>
                                </List.Item>
                            )}
                        />
                    </Popover>
                    <NavLink to={ConstanthPathEnum.COMPANY_LIST}>
                        <Button sx={{ fontSize: "16px", fontWeight: "700" }}>詳細なサービス</Button>
                    </NavLink>
                    {localStorage.getItem('isAdmin') &&
                        <Box>
                            <Button
                                sx={{ fontSize: "16px", fontWeight: "700" }}
                                onClick={hanldeAdminOpen}
                            >
                                アドミン
                            </Button>
                            <Menu
                                anchorEl={adminEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(adminEl)}
                                onClose={handleAdminClose}
                            >
                                <MenuItem >
                                    <NavLink to={ConstanthPathEnum.ADMIN_PRODUCT} style={{ color: "#333" }} onClick={handleAdminClose}>
                                        プロダクト
                                    </NavLink>
                                </MenuItem>
                                <MenuItem >
                                    <NavLink to={ConstanthPathEnum.ADMIN_CATEGORY} style={{ color: "#333" }} onClick={handleAdminClose}>
                                        カテゴリー
                                    </NavLink>
                                </MenuItem>
                                <MenuItem >
                                    <NavLink to={ConstanthPathEnum.ADMIN_SHOP} style={{ color: "#333" }} onClick={handleAdminClose}>
                                        売り場
                                    </NavLink>
                                </MenuItem>
                                <MenuItem >
                                    <NavLink to={ConstanthPathEnum.ADMIN_COMPANY} style={{ color: "#333" }} onClick={handleAdminClose}>
                                        詳細なサービス
                                    </NavLink>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }
                </Box>
            </Container>
        </Box>
    );
};

export default Navigation;