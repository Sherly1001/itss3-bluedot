import { Box, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../requests/axiosInstance";
import { Company } from "../../type/company";

function Companies() {

    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        axiosInstance.get('deliverer')
            .then(res => setCompanies(res.data.data))
    }, [])

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
                    {companies.map((company: Company) => (
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
                                sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: "20px" }}
                            >
                                {company.name}
                            </Typography>
                            <Box sx={{ display: "flex", padding: "0 30px" }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                    >
                                        レート
                                    </Typography>
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Rating defaultValue={company.rate} precision={0.5} readOnly />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <img src={company.imageUrl} style={{ height: "150px" }} />
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