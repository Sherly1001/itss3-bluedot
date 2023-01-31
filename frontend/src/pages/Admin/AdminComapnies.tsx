import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../requests/axiosInstance";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Form, Input, Modal, Pagination } from 'antd';
import { Company } from "../../type/company";

const { confirm } = Modal;

interface NewCompanyValue {
    name: string;
    imageUrl: string;
}

function AdminCompanies() {
    const [totals, setTotals] = useState<Company[]>([]);
    const [listCompanies, setListCompanies] = useState<Company[]>([]);
    const [page, setPage] = useState<number>(1);

    // Add new company
    const [open, setOpen] = useState<boolean>(false);
    const [addForm] = Form.useForm();

    // Edit
    const [selected, setSelected] = useState<string>("");
    const [editForm] = Form.useForm();

    useEffect(() => {
        axiosInstance.get('deliverer')
            .then(res => {
                setTotals(res.data.data);
                if (page === 1) setListCompanies(res.data.data.slice(0, 5));
            })
    }, []);

    useEffect(() => {
        const num = (page - 1) * 5;
        setListCompanies(totals.slice(num, num + 5));
    }, [page, totals]);

    const handleAdd = () => {
        addForm
            .validateFields()
            .then((values: NewCompanyValue) => {
                addForm.resetFields();
                axiosInstance.post("deliverer", values)
                    .then(res => {
                        setTotals([res.data.data, ...totals]);
                        setOpen(false);
                    });
            })
            .catch((info) => {
                console.log('Validate failed: ', info);
            })
    };

    const handleEdit = (id: string) => {
        const selectedCompany = listCompanies.find(item => item.id === id);
        editForm.setFieldsValue({
            name: selectedCompany?.name,
            imageUrl: selectedCompany?.imageUrl
        });
        setSelected(id);
    };

    const handleUppdate = () => {
        editForm
            .validateFields()
            .then((values: NewCompanyValue) => {
                editForm.resetFields();
                axiosInstance.put(`deliverer/${selected}`, values)
                    .then(res => {
                        setTotals(totals.map(item => {
                            if (item.id === res.data.data.id) item = { ...res.data.data }
                            return item;
                        }));
                        setSelected("");
                    });
            })
            .catch((info) => {
                console.log('Validate failed: ', info);
            })
    };

    const showConfirm = (id: string) => {
        confirm({
            content: "これらのアイテムを削除しますか?",
            okText: "同意",
            cancelText: "キャンセル",
            onOk() {
                axiosInstance.delete(`deliverer/${id}`);
                setTotals(totals.filter(item => item.id !== id));
            }
        })
    };

    const handleChange = (p: number) => {
        setPage(p);
    };

    return (
        <Box sx={{ padding: "50px" }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                    運転会社
                </Typography>
                <Box sx={{ padding: "30px", display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpen(true)}
                        startIcon={<AddIcon />}
                    >
                        追加
                    </Button>
                    <Modal
                        title="新しい売り場"
                        open={open}
                        okText="追加"
                        cancelText="キャンセル"
                        onCancel={() => setOpen(false)}
                        onOk={handleAdd}
                    >
                        <Form
                            form={addForm}
                            layout="vertical"
                            name="add_form"
                        >
                            <Form.Item
                                name="name"
                                label="名前"
                                rules={[
                                    {
                                        required: true,
                                        message: "このフィールドに入力してください。"
                                    }
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
                                        message: "このフィールドに入力してください。"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px"
                    }}
                >
                    {listCompanies.map(com => (
                        <Box
                            key={com.id}
                            sx={{
                                border: "1px solid #333",
                                padding: "20px",
                                width: "80%",
                                borderRadius: "10px",
                                cursor: "pointer",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                paddingBottom: "100px",
                                position: "relative",
                                boxSizing: "border-box",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {com.name}
                            </Typography>
                            <Box sx={{ display: "flex", padding: "0 10px" }}>
                                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                        >
                                            レート
                                        </Typography>
                                        <Box>
                                            <Rating value={com.rate} precision={0.5} readOnly />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 2 }}>
                                    <img src={com.imageUrl} style={{ height: "150px" }} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <img src="https://www.bighospitality.co.uk/var/wrbm_gb_hospitality/storage/images/publications/hospitality/bighospitality.co.uk/article/2020/01/28/the-future-of-restaurant-delivery/3268223-2-eng-GB/The-future-of-restaurant-delivery.jpg" style={{ height: "150px" }} />
                                </Box>
                            </Box>
                            <Box sx={{ position: "absolute", bottom: "30px", right: "50px", display: "flex", gap: "10px" }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleEdit(com.id)}
                                    startIcon={<EditIcon />}
                                >
                                    編集
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => showConfirm(com.id)}
                                    startIcon={<DeleteIcon />}
                                >
                                    消去
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", margin: "50px 0" }}>
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
                    onCancel={() => setSelected("")}
                    onOk={handleUppdate}
                >
                    <Form
                        form={editForm}
                        layout="vertical"
                        name="edit_form"
                    >
                        <Form.Item
                            name="name"
                            label="名前"
                            rules={[
                                {
                                    required: true,
                                    message: "このフィールドに入力してください。"
                                }
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
                                    message: "このフィールドに入力してください。"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Container>
        </Box>
    );
};

export default AdminCompanies;