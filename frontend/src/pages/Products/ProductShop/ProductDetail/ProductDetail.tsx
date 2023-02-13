import { Box, Button, Container, Typography, Rating } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';
import { Price, Product } from '../../../../type/product';
import { Avatar, Input, List, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../requests/axiosInstance';
import { Shop } from '../../../../type/shop';
import { ConstanthPathEnum } from '../../../../constanth/constanth.path';

const { TextArea } = Input;

interface cmtResponse {
  id: string;
  content: string;
  rate: number;
  item: string;
  shop: Shop | undefined;
  user: {
    name: string | null;
    email: string | null;
    isAdmin: boolean;
  };
}

function ProductDetail() {
  const [product, setProduct] = useState<Product>();
  const [totals, setTotals] = useState<cmtResponse[]>([]);
  const [listComment, setListComment] = useState<cmtResponse[]>([]);
  const [comment, setComment] = useState<string>('');
  const [rate, setRate] = useState<number | null>(0);
  const [page, setPage] = useState<number>(1);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFocus = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    //console.log(params)
    axiosInstance
      .get(`item/${params.product_id}?page=1&shops=${params.shop_id}`)
      .then((res) => {
        //console.log(res.data.data.items[0])
        setProduct(res.data.data.items[0]);
      });
    axiosInstance
      .get(`comment/${params.product_id}/${params.shop_id}`)
      .then((res) => {
        //console.log(res.data.data);
        setTotals(res.data.data);
        if (page === 1) setListComment(res.data.data.slice(0, 5));
      });
  }, []);

  const price: Price | undefined = product?.prices.find(
    (item) => item.shop.id === params.shop_id,
  );

  const handleSubmit = async () => {
    if (comment && rate !== 0) {
      //console.log({product, shop});
      const reqBody = {
        content: comment,
        rate: rate || 5,
        item: params.product_id,
        shop: params.shop_id,
        deliverer: null,
      };
      //console.log(reqBody);
      axiosInstance.post('comment', reqBody).then((res) => {
        const newComt: any = {
          id: res.data.data.id,
          content: res.data.data.content,
          rate: res.data.data.rate,
          item: res.data.data.item,
          shop: price?.shop,
          user: {
            name: localStorage.getItem('username'),
            email: localStorage.getItem('useremail'),
            isAdmin: false,
          },
        };
        setTotals([newComt, ...totals]);
        //console.log(res.data.data);
      });
      setComment('');
      setRate(0);
      setErrorMessage('');
    } else {
      setErrorMessage('2 つのフィールドに入力してください');
    }
  };

  useEffect(() => {
    const num = (page - 1) * 5;
    setListComment(totals.slice(num, num + 5));
  }, [page, totals]);

  const handleChange = (p: number) => {
    setPage(p);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '50px' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '30px',
          }}
        >
          アイテム
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: '1',
            }}
          >
            <img
              src={product?.imageUrl}
              style={{ height: '250px', width: '250px' }}
            />
          </Box>
          <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', padding: '20px 50px' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '20%',
                }}
              >
                製品
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '60%',
                }}
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
            <Box sx={{ display: 'flex', padding: '0 50px' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '20%',
                }}
              >
                値段
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '60%',
                }}
              >
                {price?.price}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <Rating value={price?.rate || 0} precision={0.5} readOnly />
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', padding: '0 50px', marginTop: '50px' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '20%',
                }}
              >
                売り場
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '60%',
                }}
              >
                {price?.shop.name}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <NavLink
                  to={
                    localStorage.getItem('token')
                      ? ConstanthPathEnum.CHAT_INDEX + '/' + params.shop_id
                      : ConstanthPathEnum.SIGN_IN
                  }
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    sx={{ width: '100px', fontWeight: '600', color: '#fff' }}
                  >
                    チャット
                  </Button>
                </NavLink>
              </Typography>
            </Box>
          </Box>
        </Box>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '30px',
          }}
        >
          コメント
        </Typography>
        {localStorage.getItem('username') && (
          <Box
            sx={{
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <TextArea
              allowClear
              showCount
              maxLength={1000}
              placeholder="評価..."
              autoSize={{ minRows: 2 }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={handleFocus}
            />
            <Rating
              precision={0.5}
              value={rate}
              onChange={(_, value) => setRate(value)}
              onFocus={handleFocus}
            />
            <span style={{ color: 'red' }}>{errorMessage}</span>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              sx={{ width: '100px', fontWeight: '600', color: '#fff' }}
              onClick={handleSubmit}
            >
              評価
            </Button>
          </Box>
        )}
        <Box sx={{ padding: '30px' }}>
          <List
            itemLayout="horizontal"
            dataSource={listComment}
            size="large"
            renderItem={(item: cmtResponse) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={item.user.name}
                  description={item.content}
                />
                <Rating value={item.rate} precision={0.5} readOnly />
              </List.Item>
            )}
          ></List>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}
          >
            <Pagination
              total={totals.length}
              pageSize={5}
              defaultCurrent={page}
              onChange={handleChange}
              showSizeChanger={false}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetail;
