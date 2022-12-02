import { Box, Container, Typography } from '@mui/material';
import { Input } from 'antd';
import { Button, Card, List } from 'antd';

const { Search } = Input;
const { Meta } = Card;

const data = [
    {
        title: '電化製品',
        url: 'http://cpsresources.com/wp-content/uploads/2014/12/appliance-electronics-industry.jpg'
    },
    {
        title: 'アパレル',
        url: 'https://static.independent.co.uk/2022/01/28/16/Best%20online%20clothes%20shops%20and%20brands%20Indybest%20copy.jpg?quality=75&width=982&height=726&auto=webp'
    },
    {
        title: '本',
        url: 'https://www.realsimple.com/thmb/KrGb42aamhHKaMzWt1Om7U42QsY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg'
    },
    {
        title: 'スポーツ',
        url: 'https://img.freepik.com/free-vector/soccer-volleyball-baseball-rugby-equipment_1441-4026.jpg'
    },
];

function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ width: "80%", textAlign: 'center', margin: '30px auto' }}>
                <Search placeholder="検索 ..." enterButton="検索" size="large" />
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around' }}>
                <Button type="primary" style={{ width: '120px' }}>メニュー</Button>
                <Button type="primary" style={{ width: '120px' }}>転送サービス</Button>
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    カテゴリの一覧表示
                </Typography>
                    <List
                        grid={{ gutter: 12, column: 4 }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={<img alt='electronics image' src={item.url} style={{ height: '150px' }} />}
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