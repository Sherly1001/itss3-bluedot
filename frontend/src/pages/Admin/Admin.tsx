import { Box, Button, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { ConstanthPathEnum } from "../../constanth/constanth.path";

function Admin() {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mzg2MWYxZTc3MTA3NjU2YzliYTU3YmIiLCJlbWFpbCI6InNoZXJAbm9vYi5jb20iLCJpYXQiOjE2NzAyNjQzODZ9.vtZDybIVmxNjLjsoO3Ta27u9JF91U7yaZmOn_Uy2mL4');
    return (
        <Box sx={{ padding: "30px" }}>
            <Container maxWidth="lg">
                {/* <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    アドミン
                </Typography> */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                        sx={{
                            width: "70%",
                            display: "flex",
                            gap: "10%",
                            justifyContent: "space-around",
                            paddingLeft: "10px",
                            backgroundColor: "#e91e63",
                            borderRadius: "5px",
                        }}
                    >
                        <NavLink to={ConstanthPathEnum.ADMIN_PRODUCT}>
                            <Button sx={{ fontSize: "16px", fontWeight: "700" }}>プロダクト</Button>
                        </NavLink>
                        <NavLink to={ConstanthPathEnum.ADMIN_SHOP}>
                            <Button sx={{ fontSize: "16px", fontWeight: "700" }}>売り場</Button>
                        </NavLink>
                        <NavLink to={ConstanthPathEnum.ADMIN_CATEGORY}>
                            <Button sx={{ fontSize: "16px", fontWeight: "700" }}>カテゴリー</Button>
                        </NavLink>
                        <NavLink to={ConstanthPathEnum.ADMIN_COMPANY}>
                            <Button sx={{ fontSize: "16px", fontWeight: "700" }}>詳細なサービス</Button>
                        </NavLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Admin;