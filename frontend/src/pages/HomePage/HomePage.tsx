import { Box, Container, Typography } from '@mui/material';
import { Card, List } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../requests/axiosInstance';
import { Category } from '../../type/category';
import { Product } from '../../type/product';
import { getCategoryRoute, getProductShopRoute } from '../../ultis/route';

const { Meta } = Card;

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosInstance
      .get('category')
      .then((res) => setCategories(res.data.data.slice(0, 10)));

    axiosInstance.get('item').then((res) => setProducts(res.data.data.items));
  }, []);

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
          カテゴリー
        </Typography>
        <Card>
          {categories.map((cat) => (
            <Card.Grid
              key={cat.id}
              style={{
                width: '20%',
                textAlign: 'center',
              }}
            >
              <NavLink
                to={getCategoryRoute(cat.name)}
                style={{ color: '#333' }}
              >
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <img
                    src={cat.imageUrl}
                    style={{ height: '70px', width: '70px' }}
                  />
                  {cat.name}
                </Box>
              </NavLink>
            </Card.Grid>
          ))}
        </Card>
      </Box>
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
          アイテム
        </Typography>
        <List
          grid={{ column: 4 }}
          dataSource={products}
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
      </Box>
    </Container>
  );
}

export default HomePage;
