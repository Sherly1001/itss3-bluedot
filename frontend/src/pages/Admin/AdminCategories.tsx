import { Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosInstance from '../../requests/axiosInstance';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, Input, Modal, Pagination } from 'antd';
import { Category } from '../../type/category';

const { confirm } = Modal;

interface NewCategoryValue {
  name: string;
  imageUrl: string;
}

function AdminCategories() {
  const [totals, setTotals] = useState<Category[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [page, setPage] = useState<number>(1);

  // Add new category
  const [open, setOpen] = useState<boolean>(false);
  const [addForm] = Form.useForm();

  // Edit
  const [selected, setSelected] = useState<string>('');
  const [editForm] = Form.useForm();

  useEffect(() => {
    axiosInstance.get('category').then((res) => {
      setTotals(res.data.data);
      if (page === 1) setListCategories(res.data.data.slice(0, 5));
    });
  }, []);

  useEffect(() => {
    const num = (page - 1) * 5;
    setListCategories(totals.slice(num, num + 5));
  }, [page, totals]);

  const handleAdd = () => {
    addForm
      .validateFields()
      .then((values: NewCategoryValue) => {
        addForm.resetFields();
        axiosInstance.post('category', values).then((res) => {
          setTotals([res.data.data[0], ...totals]);
          setOpen(false);
        });
      })
      .catch((info) => {
        console.log('Validate failed: ', info);
      });
  };

  const handleEdit = (id: string) => {
    const selectedCategory = listCategories.find((item) => item.id === id);
    editForm.setFieldsValue({
      name: selectedCategory?.name,
      imageUrl: selectedCategory?.imageUrl,
    });
    setSelected(id);
  };

  const handleUppdate = () => {
    editForm
      .validateFields()
      .then((values: NewCategoryValue) => {
        editForm.resetFields();
        axiosInstance.put(`category/${selected}`, values).then((res) => {
          setTotals(
            totals.map((item) => {
              if (item.id === res.data.data.id) item = { ...res.data.data };
              return item;
            }),
          );
          setSelected('');
        });
      })
      .catch((info) => {
        console.log('Validate failed: ', info);
      });
  };

  const showConfirm = (id: string) => {
    confirm({
      content: 'これらのアイテムを削除しますか?',
      okText: '同意',
      cancelText: 'キャンセル',
      onOk() {
        const deleteCategories = {
          ids: [id],
        };
        axiosInstance.delete('category', { data: deleteCategories });
        setTotals(totals.filter((item) => item.id !== id));
      },
    });
  };

  const handleChange = (p: number) => {
    setPage(p);
  };

  return (
    <Box sx={{ padding: '50px' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="div"
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          カテゴリー
        </Typography>
        <Box
          sx={{ padding: '30px', display: 'flex', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
          >
            追加
          </Button>
          <Modal
            title="新しいカテゴリー"
            open={open}
            okText="追加"
            cancelText="キャンセル"
            onCancel={() => setOpen(false)}
            onOk={handleAdd}
          >
            <Form form={addForm} layout="vertical" name="add_form">
              <Form.Item
                name="name"
                label="名前"
                rules={[
                  {
                    required: true,
                    message: 'このフィールドに入力してください。',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="imageUrl"
                label="写真リンク"
                rules={[
                  {
                    required: true,
                    message: 'このフィールドに入力してください。',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {listCategories.map((cat) => (
            <Box
              key={cat.id}
              sx={{
                width: '70%',
                border: '1px solid #333',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '30px',
                paddingBottom: '100px',
                position: 'relative',
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  名前：{cat.name}
                </Typography>
              </Box>
              <Box>
                <img src={cat.imageUrl} style={{ height: '100px' }} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '30px',
                  right: '30px',
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit(cat.id)}
                  startIcon={<EditIcon />}
                >
                  編集
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => showConfirm(cat.id)}
                  startIcon={<DeleteIcon />}
                >
                  消去
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
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
        <Modal
          title="カテゴリーを編集"
          open={!!selected}
          okText="編集"
          cancelText="キャンセル"
          onCancel={() => setSelected('')}
          onOk={handleUppdate}
        >
          <Form form={editForm} layout="vertical" name="edit_form">
            <Form.Item
              name="name"
              label="名前"
              rules={[
                {
                  required: true,
                  message: 'このフィールドに入力してください。',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="imageUrl"
              label="写真リンク"
              rules={[
                {
                  required: true,
                  message: 'このフィールドに入力してください。',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </Box>
  );
}

export default AdminCategories;
