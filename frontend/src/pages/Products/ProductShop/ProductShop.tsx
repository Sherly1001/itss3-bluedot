import { Box, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axiosInstance from "../../../requests/axiosInstance";
import { Category } from "../../../type/category";
import { Price, Product } from "../../../type/product";
import { Shop } from "../../../type/shop";
import { getProductDetailRoute } from "../../../ultis/route";

// const category1: Category[] = [];

// for (var i = 0; i < 3; i++) {
//     const cat: Category = {
//         id: `category-${i}`,
//         name: `Category ${i}`,
//         imageUrl: 'http://cpsresources.com/wp-content/uploads/2014/12/appliance-electronics-industry.jpg',
//     }
//     category1.push(cat);
// }

// const price1: Price[] = [];

// for (var i = 0; i < 5; i++) {
//     const newShop: Shop = {
//         id: `shop-${i}`,
//         name: `Shop ${i}`,
//         description: 'This is best shop',
//         imageUrl: 'https://deo.shopeemobile.com/shopee/shopee-mobilemall-live-sg/homepage/26c9324913c021677768c36975d635ef.png',
//     }
//     const newPrice: Price = {
//         price: (i + 1) * 1000,
//         rate: 4.5,
//         shop: newShop,
//     }
//     price1.push(newPrice);
// }

// const products: Product[] = []

// for (var i = 0; i < 20; i++) {
//     const item: Product = {
//         id: `product-${i}`,
//         name: 'Iphone 14',
//         description: 'Product made by Apple',
//         prices: price1,
//         categories: category1,
//         imageUrl: 'https://cdn.tgdd.vn/Products/Images/42/289696/iphone-14-pro-tim-thumb-600x600.jpg',
//     }
//     products.push(item);
// }

function ProductShop() {

    const [product, setProduct] = useState<Product>();

    const params = useParams();
    console.log(params.product_id);

    useEffect(() => {
        axiosInstance.get('item')
            .then(res => {
                console.log(res.data.data.find((item: any) => item.id === params.product_id ))
                setProduct(res.data.data.find((item: any) => item.id === params.product_id ))
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
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '30%' }}
                            >
                                売り場
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '30%' }}
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
                                        sx={{ display: 'flex', justifyContent: 'flex-start', width: '30%' }}
                                    >
                                        {item.shop.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ display: 'flex', justifyContent: 'flex-start', width: '30%' }}
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