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
            <Link to="/book">本</Link>
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
            <Link to="/categories">電化製品</Link>
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
const data = [
    {
        url: 'https://japaneselibrary.files.wordpress.com/2016/03/mini-kara-oboeru-goi-n2-book-audio-cd.jpg?w=620&h=889'
    },
    // {
    //     title: 'アパレル',
    //     url: 'https://static.independent.co.uk/2022/01/28/16/Best%20online%20clothes%20shops%20and%20brands%20Indybest%20copy.jpg?quality=75&width=982&height=726&auto=webp'
    // },
    // {
    //     title: '本',
    //     url: 'https://www.realsimple.com/thmb/KrGb42aamhHKaMzWt1Om7U42QsY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg'
    // },
    // {
    //     title: 'スポーツ',
    //     url: 'https://img.freepik.com/free-vector/soccer-volleyball-baseball-rugby-equipment_1441-4026.jpg'
    // },
];

function Book() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ width: "80%", textAlign: 'center', margin: '30px auto' }}>
                <Search placeholder="検索 ..." enterButton="検索" size="large" />
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around' }}>
                <Button type="primary" style={{ width: '120px' }}>ホーム</Button>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                    <Button type="primary" style={{ width: '120px' }}>メニュー</Button>
                </Dropdown>
                <Button type="primary" style={{ width: '120px' }}>転送サービス</Button>
            </Box>
            <h4>メニュー/本</h4>
            <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '120px' }}><b>製品 : 本</b></div>
            <div style={{ width: '120px' }}><b>商品名</b></div>
            <div style={{ width: '120px' }}><b>製品価格</b></div>
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around' }}>
                <img src='https://japaneselibrary.files.wordpress.com/2016/03/mini-kara-oboeru-goi-n2-book-audio-cd.jpg?w=620&h=889' style={{ height: '150px' }}></img>
                <h4>耳から覚える N2</h4>
                <h4>120 ¥ </h4>
            </Box>
            <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around' }}>
                <img src='https://japaneselibrary.files.wordpress.com/2016/03/mimi-kara-oboeru-grammar-n2.jpg?w=208&h=300' style={{ height: '150px' }}></img>
                <h4>トレーニング文法 N2</h4>
                <h4>120 ¥</h4>
            </Box>
        </Container>
    )
};

export default Book;
