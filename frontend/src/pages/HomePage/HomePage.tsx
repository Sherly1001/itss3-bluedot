import { Box, Container, Typography } from '@mui/material';
import { Input } from 'antd';
import { Button, Card, List, Dropdown } from 'antd';
import * as React from 'react';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;
const { Meta } = Card;
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <nav>
            <Link to="/book">電化製品</Link>
        </nav>
      ),
    },
    {
      key: '2',
      label: (
        <nav>
            <Link to="/categories">アパレル</Link>
        </nav>
      ),
    },
    {
      key: '3',
      label: (
        <nav>
            <Link to="/categories">本</Link>
        </nav>
      ),
    },
    {
        key: '4',
        label: (
            <nav>
            <Link to="/categories">スポーツ</Link>
        </nav>
        ),
      },
  ];
const categories = [
    {
        id: '1',
        title: '電化製品',
        url: 'http://cpsresources.com/wp-content/uploads/2014/12/appliance-electronics-industry.jpg'
    },
    {
        id: '2',
        title: 'アパレル',
        url: 'https://static.independent.co.uk/2022/01/28/16/Best%20online%20clothes%20shops%20and%20brands%20Indybest%20copy.jpg?quality=75&width=982&height=726&auto=webp'
    },
    {
        id: '3',
        title: '本',
        url: 'https://www.realsimple.com/thmb/KrGb42aamhHKaMzWt1Om7U42QsY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg'
    },
    {
        id: '4',
        title: 'スポーツ',
        url: 'https://img.freepik.com/free-vector/soccer-volleyball-baseball-rugby-equipment_1441-4026.jpg'
    },
];

const itemsList = [
    {
        id: '1',
        title: 'Iphone 14',
        url: 'https://www.klikkoran.com/wp-content/uploads/2022/07/628c66d640b70.png'
    },
    {
        id: '2',
        title: 'Galaxy Z-flip',
        url: 'https://images.samsung.com/vn/smartphones/galaxy-z-flip4/images/galaxy-z-flip4_highlights_kv.jpg'
    },
    {
        id: '3',
        title: 'Macbook Air M2',
        url: 'https://bizweb.dktcdn.net/100/116/615/products/macbook-air-midnight-select-20220606-jpeg-c6a4a144-d675-40ad-9d9b-6cb4860fbede.jpg?v=1654775482750'
    },
    {
        id: '4',
        title: 'Airpods',
        url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1632861342000'
    },
];



function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ width: "80%", textAlign: 'center', margin: '30px auto' }}>
                <Search placeholder="検索 ..." enterButton="検索" size="large" />
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around' }}>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                    <Button type="primary" style={{ width: '120px' }}>メニュー</Button>
                </Dropdown>
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
                        dataSource={categories}
                        renderItem={(item: any) => (
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
                        dataSource={itemsList}
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