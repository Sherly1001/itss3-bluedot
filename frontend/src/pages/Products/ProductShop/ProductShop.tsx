import { Box, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../../../requests/axiosInstance";
import { Price, Product } from "../../../type/product";
import { getProductDetailRoute } from "../../../ultis/route";

function ProductShop() {

    const [product, setProduct] = useState<Product>();

    const params = useParams();

    useEffect(() => {
        axiosInstance.get(`item/${params.product_id}?page=1`)
            .then(res => {
                setProduct(res.data.data.items[0]);
            })
    }, [])

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '50px' }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    アイテム
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1' }}>
                        <img src={product?.imageUrl} style={{ height: '250px', width: '250px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                製品：{product?.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {product?.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column'}}>
                        <Box
                            sx={{
                                display: 'flex',
                                color: '#333',
                                fontSize: '18px',
                                borderBottom: '1px solid #333',
                                padding: '20px 50px',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '60%' }}
                            >
                                売り場
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '20%' }}
                            >
                                値段
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                レート
                            </Typography>
                        </Box>
                        {product?.prices?.map((item: Price) => (
                            <NavLink
                                key={item.shop.id}
                                to={getProductDetailRoute(params.product_id as string, item.shop.id)}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        color: '#333',
                                        fontSize: '18px',
                                        borderBottom: '1px solid #333',
                                        padding: '20px 50px',
                                        "&:hover": {backgroundColor: '#e0e0e0'}
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start', width: '60%' }}
                                    >
                                        {item.shop.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start', width: '20%' }}
                                    >
                                        {item.price}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                    >
                                        <Rating defaultValue={item.rate} precision={0.5} readOnly />
                                    </Typography>
                                </Box>
                            </NavLink>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductShop;