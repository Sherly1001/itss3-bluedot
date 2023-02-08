import { Box, Container, Typography } from '@mui/material';
import { Card, List, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axiosInstance from '../../requests/axiosInstance';
import { Product } from '../../type/product';
import { getProductShopRoute } from '../../ultis/route';

const { Meta } = Card;

function Products() {
  const params = useParams();

  const [page, setPage] = useState<number>(1);

  const [title, setTitle] = useState<string>('アイテムの一覧表示');

  const [totals, setTotals] = useState<number>(0);

  const [listProducts, setListProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (params.category_name) {
      setTitle(`カテゴリー：　${params.category_name}`);
      axiosInstance
        .get(`category?search=${params.category_name}`)
        .then((res) => {
          axiosInstance
            .get(`item?page=${page}&categories=${res.data.data[0].id}`)
            .then((res1) => {
              setTotals(res1.data.data.totalItems);
              setListProducts(res1.data.data.items);
            });
        });
    }

    if (params.search_input) {
      setTitle(`結果：　${params.search_input}`);
      axiosInstance
        .get(`item?page=${page}&name=${params.search_input}`)
        .then((res) => {
          setTotals(res.data.data.totalItems);
          setListProducts(res.data.data.items);
        });
    }
  }, [params, page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', margin: '30px auto' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '30px',
          }}
        >
          {title}
        </Typography>
        <List
          grid={{ column: 4 }}
          dataSource={listProducts}
          renderItem={(item: Product) => (
            <List.Item style={{ padding: '10px' }}>
              <NavLink to={getProductShopRoute(item.id)}>
                <Card
                  hoverable
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  cover={
                    <img
                      alt="electronics image"
                      src={item.imageUrl}
                      style={{ height: '150px', padding: '15px' }}
                    />
                  }
                >
                  <Meta description={item.name} />
                </Card>
              </NavLink>
            </List.Item>
          )}
        />
        <Box sx={{ margin: '50px 0' }}>
          <Pagination
            total={totals}
            pageSize={20}
            defaultCurrent={page}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Products;
