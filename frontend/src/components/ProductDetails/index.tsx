import { Box, FormGroup, TextField } from "@mui/material";
import { Input, Card, MenuProps, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";

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

function ProductDetails() {
  return (
    <div style={{ margin: '80px' }}>
      <Box sx={{ textAlign: 'center', margin: '30px auto' }} >
        <Search placeholder="検索 ..." enterButton="検索" size="large" />
      </Box>
      <Box sx={{ textAlign: 'center', margin: '30px auto', display: 'flex', justifyContent: 'space-between' }}>
        <Button type="primary" style={{ width: '120px' }}>ホーム</Button>
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Button type="primary" style={{ width: '120px' }}>メニュー</Button>
        </Dropdown>
        <Button type="primary" style={{ width: '120px' }}>転送サービス</Button>
      </Box>
      <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <img src='https://japaneselibrary.files.wordpress.com/2016/03/mini-kara-oboeru-goi-n2-book-audio-cd.jpg?w=620&h=889' style={{ height: '150px' }}></img>
        </div>
        <div style={{ width: '200px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>製品</h3>
            <h3>耳から覚えるN1</h3>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>値段</h3>
            <h3>10,000VND</h3>
          </Box>
        </div>
        <div>
          <h3>レート</h3>
          <h3>☆☆☆☆☆</h3>
        </div>
      </Box>
      <Box sx={{ width: "80%", display: 'flex', justifyContent: 'space-between' }}>
        <h3>売り場</h3>
        <h3>アドレス</h3>
        <h3>認証</h3>
      </Box>
      <Box sx={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }} >
        <FormGroup row>
          <Button type="primary" style={{ height: '100%', width: '100px' }}>評価
          </Button>
          <TextField variant="outlined" placeholder="書き込み。。。" />
        </FormGroup>
      </Box>
    </div>
  );
};

export default ProductDetails;