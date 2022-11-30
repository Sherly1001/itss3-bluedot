import { Box } from '@mui/material';
import { Input } from 'antd';
import { Button, Card, List } from 'antd';

const { Search } = Input;

const data = [
    {
        title: '電化製品',
    },
    {
        title: 'アパレル',
    },
    {
        title: '本',
    },
    {
        title: 'スポーツ',
    },
];

function HomePage() {
    return (
        <>
            <Box sx={{ width: "80%", textAlign: 'center', margin: '30px auto', }}>
                <Search placeholder="検索 ..." enterButton="検索" size="large" />
            </Box>
            <Box sx={{ width: "80%", textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-around'}}>
                <Button type="primary" style={{ width: '120px'}}>ホーム</Button>
                <Button type="primary" style={{ width: '120px'}}>メニュー</Button>
                <Button type="primary" style={{ width: '120px'}}>転送サービス</Button>
            </Box>
            <Box sx={{ width: "80%", textAlign: 'center', margin: '30px auto', }}>
                <List
                    grid={{ gutter: 12, column: 2 }}
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Card title={item.title} style={{marginBottom: "30px", border: "1px solid #333"}}>内容</Card>
                        </List.Item>
                    )}
                />
            </Box>
        </>
    )
};

export default HomePage;