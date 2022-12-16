import { Box, Button, Container, Popover } from "@mui/material";
import { List } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ConstanthPathEnum } from "../../constanth/constanth.path";
import { Category } from "../../type/category";
import { getCategoyRoute } from "../../ultis/route";

const categories: Category[] = [];

for (var i = 0; i < 20; i++) {
    const cat: Category = {
        id: `book-${i}`,
        name: `book ${i}`,
        imageUrl: 'http://cpsresources.com/wp-content/uploads/2014/12/appliance-electronics-industry.jpg',
    }
    categories.push(cat);
}

function Navigation() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            style={{ width: "500px", paddingTop: "10px" }}
                            grid={{ gutter: 0, column: 5 }}
                            dataSource={categories}
                            renderItem={(item: Category) => (
                                <List.Item>
                                    <NavLink to={getCategoyRoute(item.id)} style={{ color: "#333", fontSize: "14px" }} onClick={handleClose}>
                                        {item.name}
                                    </NavLink>
                                </List.Item>
                            )}
                        />
                    </Popover>
                    <NavLink to={ConstanthPathEnum.COMPANY_LIST}>
                        <Button sx={{ fontSize: "16px", fontWeight: "700" }}>詳細なサービス</Button>
                    </NavLink>
                </Box>
            </Container>
        </Box>
    );
};

export default Navigation;