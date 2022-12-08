import { Box, Container, Typography } from '@mui/material';
import { Card, List } from 'antd';

const { Meta } = Card;

interface Product {
    id: string,
    title: string;
    url: string;
}

const products: Product[] = [];

for (var i = 0; i < 20; i++) {
    const item: Product = {
        id: `${i}`,
        title: 'Iphone 14',
        url: 'https://imageio.forbes.com/specials-images/imageserve/5f85be4ed0acaafe77436710/Stack-books-isolated-3d-rendering/960x0.jpg?format=jpg&width=960',
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
                    アイテムの一覧表示
                </Typography>
                <List
                    grid={{ gutter: 12, column: 4 }}
                    dataSource={products}
                    renderItem={(item: any) => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={<img alt='electronics image' src={item.url} style={{ height: '180px' }} />}
                            >
                                <Meta title={item.title} />
                            </Card>
                        </List.Item>
                    )}
                />
            </Box>
        </Container>
    )
};

export default HomePage;