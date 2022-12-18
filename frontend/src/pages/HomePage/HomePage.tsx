import { Box, Container, Typography } from '@mui/material';
import { Card, List } from 'antd';
import { NavLink } from 'react-router-dom';
import { Category } from '../../type/category';
import { Price, Product } from '../../type/product';
import { Shop } from '../../type/shop';
import { getCategoyRoute, getProductShopRoute } from '../../ultis/route';

const { Meta } = Card;

const category1: Category[] = [];

for (var i = 0; i < 8; i++) {
    const cat: Category = {
        id: `category-${i}`,
        name: `Category ${i}`,
        imageUrl: 'https://dictionary.cambridge.org/vi/images/thumb/book_noun_001_01679.jpg',
    }
    category1.push(cat);
}

const price1: Price[] = [];

for (var i = 0; i < 5; i++) {
    const newShop: Shop = {
        id: `shop-{i}`,
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

const products: Product[] = []

for (var i = 0; i < 12; i++) {
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

function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', margin: '30px auto', }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    カテゴリー
                </Typography>
                <Card>
                    {category1.map(cat => (
                        <Card.Grid
                            key={cat.id}
                            style={{
                                width: '25%',
                                textAlign: 'center',
                            }}>
                            <NavLink to={getCategoyRoute(cat.id)} style={{ color: "#333" }}>
                                <Box style={{ display:"flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                    <img src={cat.imageUrl} style={{ height: "70px", width: "70px" }} />
                                    {cat.name}
                                </Box>
                            </NavLink>
                        </Card.Grid>
                    ))}
                </Card>
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    アイテム
                </Typography>
                <List
                    grid={{ gutter: 12, column: 4 }}
                    dataSource={products}
                    renderItem={(item: Product) => (
                        <List.Item>
                            <NavLink to={getProductShopRoute(item.id)}>
                                <Card
                                    hoverable
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                    cover={<img alt='electronics image' src={item.imageUrl} style={{ height: '150px', width: '150px', padding: '15px' }} />}
                                >
                                    <Meta title={item.name} />
                                </Card>
                            </NavLink>
                        </List.Item>
                    )}
                />
            </Box>
        </Container>
    )
};

export default HomePage;