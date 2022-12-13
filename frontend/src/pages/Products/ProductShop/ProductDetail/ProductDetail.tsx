import { Box, Container, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Category } from "../../../../type/category";
import { Price, Product } from "../../../../type/product";
import { Shop } from "../../../../type/shop";

const category1: Category[] = [];

for (var i = 0; i < 3; i++) {
    const cat: Category = {
        id: `category-${i}`,
        name: `Category ${i}`,
        imageUrl: 'http://cpsresources.com/wp-content/uploads/2014/12/appliance-electronics-industry.jpg',
    }
    category1.push(cat);
}

const price1: Price[] = [];

for (var i = 0; i < 5; i++) {
    const newShop: Shop = {
        id: `shop-${i}`,
        name: `Shop ${i}`,
        description: 'This is best shop',
        imageUrl: 'https://deo.shopeemobile.com/shopee/shopee-mobilemall-live-sg/homepage/26c9324913c021677768c36975d635ef.png',
    }
    const newPrice: Price = {
        price: (i + 1) * 1000,
        rate: 4.5,
        shop: newShop,
    }
    price1.push(newPrice);
}

const products: Product[] = [];

for (var i = 0; i < 20; i++) {
    const item: Product = {
        id: `product-${i}`,
        name: 'Iphone 14',
        description: 'Product made by Apple',
        prices: price1,
        categories: category1,
        imageUrl: 'https://cdn.tgdd.vn/Products/Images/42/289696/iphone-14-pro-tim-thumb-600x600.jpg',
    }
    products.push(item);
}

function ProductDetail() {
    
    const params = useParams();
    const product = products.find( item => item.id === params.product_id)
    const price = product?.prices.find( item => item.shop.id === params.shop_id)

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
                        <img src={products[0].imageUrl} style={{ height: '250px', width: '250px' }} />
                    </Box>
                    <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                        >
                            製品：{products[0].name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                        >
                            値段：{price?.price}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                        >
                            レート：<Rating defaultValue={price?.rate} precision={0.5} readOnly />
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                        >
                            売り場：{price?.shop.name} 認証
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetail;