import { Box, Button, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axiosInstance from '../../requests/axiosInstance';
import { Product } from '../../type/product';
import { getAdminProductDetail } from '../../ultis/route';
import AddIcon from '@mui/icons-material/Add';
import { Category } from '../../type/category';
import { Card, List, Pagination } from 'antd';
import { ConstanthPathEnum } from '../../constanth/constanth.path';

const { Meta } = Card;

function AdminProducts() {
  const [page, setPage] = useState<number>(1);

  const [totals, setTotals] = useState<number>(0);

  const [listProducts, setListProducts] = useState<Product[]>([]);

  useEffect(() => {
    axiosInstance.get(`item?page=${page}`).then((res) => {
      setTotals(res.data.data.totalItems);
      setListProducts(res.data.data.items);
    });
  }, [page]);

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
          アイテム
        </Typography>
        <Box sx={{ margin: '30px 0' }}>
          <NavLink to={ConstanthPathEnum.ADMIN_PRODUCT_ADD}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              追加
            </Button>
          </NavLink>
        </Box>
        <List
          grid={{ column: 4 }}
          dataSource={listProducts}
          renderItem={(item: Product) => (
            <List.Item style={{ padding: '10px' }}>
              <NavLink to={getAdminProductDetail(item.id)}>
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

export default AdminProducts;
