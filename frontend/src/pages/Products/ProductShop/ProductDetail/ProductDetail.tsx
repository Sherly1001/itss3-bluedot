import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Category } from "../../../../type/category";
import { Comment } from "../../../../type/comment";
import { Price, Product } from "../../../../type/product";
import { Shop } from "../../../../type/shop";
import { Avatar, Input, List, Pagination } from 'antd';
import { useEffect, useState } from "react";
import { User } from "../../../../type/user";

const { TextArea } = Input;

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

const comments: Comment[] = [];

for (var i = 0; i < 30; i++) {
    const u: User = {
        name: `user-${i + 1}`,
        email: 'abc',
        avatarUrl: 'abc',
    }
    const c: Comment = {
        id: `cmt-${i + 1}`,
        content: 'acnakjsnckjasncjknasjkcsac',
        rate: 3,
        user: u,
    }

    comments.push(c);
}

function ProductDetail() {
    const [listComment, setListComment] = useState<Comment[]>([]);
    const [comment, setComment] = useState<string>("");
    const [rate, setRate] = useState<number | null>(0);
    const [page, setPage] = useState<number>(1)
    const params = useParams();
    const product = products.find(item => item.id === params.product_id)
    const price = product?.prices.find(item => item.shop.id === params.shop_id)

    const handleSubmit = () => {
        console.log({ comment, rate })
    }

    useEffect(() => {
        const num = (page - 1) * 10;
        setListComment(comments.slice(num, num + 10));
    }, [page])

    const handleChange = (p: number) => {
        setPage(p);
    }

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
                        <Box sx={{ display: "flex", padding: "20px 50px" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: "30%" }}
                            >
                                製品
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: "40%" }}
                            >
                                {product?.name}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                レート
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", padding: "0 50px" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: "30%" }}
                            >
                                値段
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: "40%" }}
                            >
                                {price?.price}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                <Rating defaultValue={price?.rate} precision={0.5} readOnly />
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", padding: "0 50px", marginTop: "50px" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: "30%" }}
                            >
                                売り場
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {price?.shop.name}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '30px' }}
                >
                    コメント
                </Typography>
                <Box sx={{ padding: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <TextArea
                        showCount
                        maxLength={1000}
                        placeholder="評価..."
                        autoSize={{ minRows: 2 }}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <Rating precision={0.5} value={rate} onChange={(_, value) => setRate(value)} />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="medium"
                        sx={{ width: "100px", fontWeight: "600", color: "#fff" }}
                        onClick={handleSubmit}
                    >
                        評価
                    </Button>
                </Box>
                <Box sx={{ padding: "0 50px" }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={listComment}
                        size="large"
                        renderItem={(item: Comment) => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={<Avatar/>}
                                    title={item.user.name}
                                    description={item.content}
                                />
                                <Rating defaultValue={item.rate} precision={0.5} readOnly />
                            </List.Item>
                        )}>

                    </List>
                    <Box sx={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
                        <Pagination
                            total={30}
                            pageSize={10}
                            defaultCurrent={page}
                            onChange={handleChange}
                            showSizeChanger={false}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductDetail;