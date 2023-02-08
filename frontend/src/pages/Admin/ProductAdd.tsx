import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Box, Container, Typography } from '@mui/material';
import { Button, Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ConstanthPathEnum } from '../../constanth/constanth.path';
import axiosInstance from '../../requests/axiosInstance';
import { Category } from '../../type/category';
import { Shop } from '../../type/shop';

interface ProductInfo {
  name: string;
  description: string;
  imageUrl: string;
  categories: string[];
  prices: [
    {
      shop: string;
      price: string;
    },
  ];
}

function ProductAdd() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('category').then((res) => setCategories(res.data.data));
    axiosInstance.get('shop').then((res) => setShops(res.data.data));
  }, []);

  const handleFinish = async (values: ProductInfo) => {
    const newProduct = {
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      categories: values.categories,
      prices: values.prices.map((item) => ({
        shop: item.shop,
        price: +item.price,
      })),
    };
    try {
      await axiosInstance.post('item', newProduct);
      navigate(ConstanthPathEnum.ADMIN_PRODUCT);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '80%', margin: '30px auto', textAlign: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          新しい製品
        </Typography>
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={handleFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="製品名"
            rules={[
              {
                required: true,
                message: '名を入力してください。',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="製品説明"
            name="description"
            rules={[
              {
                required: true,
                message: '説明を入力してください。',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="写真リンク"
            name="imageUrl"
            rules={[
              {
                required: true,
                message: '写真リンクを入力してください。',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="カテゴリー"
            name="categories"
            rules={[
              {
                required: true,
                message: 'カテゴリーを入力してください。',
              },
            ]}
          >
            <Select mode="multiple" allowClear>
              {categories.map((cat: Category) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="アイテム"
            name="prices"
            rules={[
              {
                required: true,
                message: 'アイテムを入力してください。',
              },
            ]}
          >
            <Form.List name="prices">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        justifyContent: 'space-between',
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'shop']}
                        rules={[
                          {
                            required: true,
                            message: '売り場を入力してください。',
                          },
                        ]}
                      >
                        <Select
                          allowClear
                          placeholder="売り場"
                          style={{ width: '270px' }}
                        >
                          {shops?.map((shop: Shop) => (
                            <Select.Option key={shop.id} value={shop.id}>
                              {shop.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'price']}
                        rules={[
                          {
                            required: true,
                            message: '値段を入力してください。',
                          },
                        ]}
                      >
                        <Input
                          placeholder="値段"
                          type="number"
                          style={{ width: '270px' }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        style={{
                          fontSize: '20px',
                          position: 'relative',
                          top: '-10px',
                        }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      新しい分野
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Box sx={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Button
              style={{ backgroundColor: '#e91e63' }}
              className="form-btn"
              type="primary"
              htmlType="submit"
            >
              追加
            </Button>
            <NavLink to={ConstanthPathEnum.ADMIN_PRODUCT}>
              <Button
                style={{ backgroundColor: '#e91e63' }}
                className="form-btn"
                type="primary"
              >
                キャンセル
              </Button>
            </NavLink>
          </Box>
        </Form>
      </Box>
    </Container>
  );
}

export default ProductAdd;
