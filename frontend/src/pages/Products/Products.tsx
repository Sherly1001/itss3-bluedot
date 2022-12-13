import { Box, Container, Typography } from '@mui/material';
import { Card, List, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Category } from '../../type/category';
import { Price, Product } from '../../type/product';
import { Shop } from '../../type/shop';
import { getProductShopRoute } from '../../ultis/route';

const { Meta } = Card;

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

for (var i = 0; i < 100; i++) {
    const item: Product = {
        id: `product-${i}`,
        name: `iphone 14 ${i}`,
        description: 'Product made by Apple',
        prices: price1,
        categories: category1,
        imageUrl: 'https://cdn.tgdd.vn/Products/Images/42/289696/iphone-14-pro-tim-thumb-600x600.jpg',
    }
    products.push(item);
}

function Products() {
    const params = useParams();

    const [page, setPage] = useState<number>(1);

    const [title, setTitle] = useState<string>("アイテムの一覧表示");

    useEffect(() => {
        console.log(params);
        if(params.category_id) setTitle(`カテゴリー：　${params.category_id}`);
        else if(params.search_input) setTitle(`結果：　${params.search_input}`);
        else setTitle("アイテムの一覧表示");
    }, [params])

    const [listProducts, setListProducts] = useState<Product[]>([]);

    useEffect(() => {
        const num = (page - 1) * 12
        setListProducts(products.slice(num, num + 12))
    }, [page])

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', margin: '30px auto', }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    {title}
                </Typography>
                <List
                    grid={{ gutter: 12, column: 4 }}
                    dataSource={listProducts}
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
                <Box sx={{ margin: '50px 0' }}>
                    <Pagination
                        total={100}
                        pageSize={12}
                        defaultCurrent={page}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Products;