import { Box, Container, Rating, Typography } from "@mui/material";
import { Company } from "../../type/company";

const companiesList: Company[] = [];

for (var i = 0; i < 5; i++) {
    const comp: Company = {
        name: `Company ${i+1}`,
        id: `company-${i}`,
        rate: 3.5,
        imageUrl: 'https://img.cdn.vncdn.io/nvn/ncdn/store/26/artCT/42374/giao_hang_tiet_kiem.png',
    }
    companiesList.push(comp);
}

function Companies() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', margin: '30px auto' }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}
                >
                    運転会社の一覧表示
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
                    {companiesList.map((company: Company) => (
                        <Box key={company.id}
                            sx={{
                                border: "1px solid #333",
                                padding: "20px",
                                width: "80%",
                                borderRadius: "10px",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px"
                            }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {company.name}
                            </Typography>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                    >
                                        アドレス
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                    >
                                        レート
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Box />
                                    <Rating defaultValue={company.rate} precision={0.5} readOnly />
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <img src={company.imageUrl} style={{ height: "100px" }} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <img src={'https://printgo.vn/uploads/file-logo/1/512x512.e1267ccd23435225c187a0d29782afe2.ai.1.png'} style={{ height: "100px" }} />
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default Companies;