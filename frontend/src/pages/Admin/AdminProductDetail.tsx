import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../requests/axiosInstance";
import { Price, Product } from "../../type/product";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../type/category";
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import { Shop } from "../../type/shop";
import { Form, Input, Modal, Select } from "antd";
import { ConstanthPathEnum } from "../../constanth/constanth.path";

const { confirm } = Modal;

interface NewProduct {
    name: string;
    description: string;
    imageUrl: string;
    categories: string[];
}

function AdminProductDetail() {
    const [open, setOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();
    const [prices, setPrices] = useState<Price[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [shops, setShops] = useState<Shop[]>([]);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState<string>("");
    const [infoEdit, setInfoEdit] = useState<boolean>(false);
    const [info, setInfo] = useState<NewProduct>();

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get(`item/${params.product_id}?page=1`)
            setProduct(res.data.data.items[0]);
            setPrices(res.data.data.items[0].prices);
            setInfo({
                name: res.data.data.items[0].name,
                description: res.data.data.items[0].description,
                imageUrl: res.data.data.items[0].imageUrl,
                categories: res.data.data.items[0].categories.map((item: Category) => item.id)
            });
            const res1 = await axiosInstance.get('shop');
            setShops(res1.data.data);
            const res2 = await axiosInstance.get('category');
            setCategories(res2.data.data.map((item: Category) => ({
                value: item.id,
                label: item.name,
            })));
        }
        fetchData();
    }, []);

    // Edit Price:
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const handleAddItem = () => {
        if (edit) {
            addForm
                .validateFields()
                .then((values: any) => {
                    addForm.resetFields();
                    const newPrice: Price = {
                        price: values.price,
                        rate: 0,
                        shop: shops.find(item => item.id === values.shop) as Shop
                    }
                    if (!prices.find(item => item.shop.id === values.shop)) {
                        setPrices([newPrice, ...prices]);
                    }
                    setOpen(false);
                })
                .catch((info) => {
                    console.log('Validate failed: ', info);
                })
        }
    };

    const handleDeleteItem = (id: string) => {
        if (edit) {
            setPrices(prices.filter(item => item.shop.id !== id));
        }
    };

    const handleEditItem = (id: string) => {
        if (edit) {
            editForm.setFieldsValue({
                price: prices.find(item => item.shop.id === id)?.price
            })
            setSelected(id);
        };
    };

    const handleUpdateItem = () => {
        if (edit) {
            editForm
                .validateFields()
                .then((values: any) => {
                    editForm.resetFields();
                    const newPrices = prices.map(item => {
                        if (item.shop.id === selected) item.price = values.price;
                        return item;
                    })
                    setPrices(newPrices);
                    setSelected("");
                })
                .catch((info) => {
                    console.log('Validate failed: ', info);
                })
        }
    };

    // Edit Product:
    const [editInfoForm] = Form.useForm();

    const handleEditInfo = () => {
        const options = product?.categories.map(item => ({ value: item.id, label: item.name }))
        editInfoForm.setFieldsValue({
            name: product?.name,
            description: product?.description,
            imageUrl: product?.imageUrl,
            categories: options,
        });
        setInfoEdit(true);
    };

    const handleUpdateInfo = () => {
        if (edit) {
            editInfoForm
                .validateFields()
                .then((values: any) => {
                    editInfoForm.resetFields();
                    const newPro: NewProduct = {
                        name: values.name,
                        description: values.description,
                        imageUrl: values.imageUrl,
                        categories: typeof values.categories[0] === "object"
                            ? values.categories.map((item: any) => item.value)
                            : values.categories
                    }
                    setInfo(newPro);
                    setInfoEdit(false);
                })
                .catch((info) => {
                    console.log('Validate failed: ', info);
                })
        }
    };

    const handleUpdateProduct = () => {
        const newProduct = {
            ...info,
            prices: prices.map((item: Price) => ({
                shop: item.shop.id,
                price: +item.price,
            })),
        }
        axiosInstance.put(`item/${product?.id}`, newProduct)
            .then(res => {
                setProduct(res.data.data);
                setPrices(res.data.data.prices);
            });
        setEdit(false);
    };

    const showConfirmDeleteProduct = () => {
        confirm({
            content: "これらのアイテムを削除しますか?",
            okText: "同意",
            cancelText: "キャンセル",
            onOk() {
                axiosInstance.delete(`item/${params.product_id}`);
                navigate(ConstanthPathEnum.ADMIN_PRODUCT);
            }
        })
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ paddingTop: '50px' }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    アイテム
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1' }}>
                        <img src={info?.imageUrl} style={{ height: '250px', width: '250px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {info?.name}
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                {product?.categories.map((cat: Category) => (
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        key={cat.id}
                                        sx={{ backgroundColor: "#e0e0e0", padding: "2px 10px", borderRadius: "20px" }}
                                    >
                                        {cat.name}
                                    </Typography>
                                ))}
                            </Box>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {info?.description}
                            </Typography>
                            {edit &&
                                <Box sx={{ padding: '20px 0' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleEditInfo}
                                    >
                                        編集情報
                                    </Button>
                                </Box>
                            }
                            <Modal
                                title="アイテム情報の編集"
                                open={infoEdit}
                                okText="編集"
                                cancelText="キャンセル"
                                onCancel={() => setInfoEdit(false)}
                                onOk={handleUpdateInfo}
                            >
                                <Form
                                    form={editInfoForm}
                                    layout="vertical"
                                    name="edit_info_form"
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
                                        name="description"
                                        label="説明"
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
                                        name="categories"
                                        label="カテゴリー"
                                        rules={[
                                            {
                                                required: true,
                                                message: "このフィールドに入力してください。"
                                            }
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                        >
                                            {categories.map((item: any) => (
                                                <Select.Option key={item.value} value={item.value}>
                                                    {item.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
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
                    </Box>
                    <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                color: '#333',
                                fontSize: '18px',
                                borderBottom: '1px solid #333',
                                padding: '20px',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '40%' }}
                            >
                                売り場
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '25%' }}
                            >
                                値段
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '25' }}
                            >
                                レート
                            </Typography>
                            <Box />
                        </Box>
                        {prices?.map((item: Price) => (
                            <Box
                                key={item.shop.id}
                                sx={{
                                    display: 'flex',
                                    color: '#333',
                                    fontSize: '18px',
                                    borderBottom: '1px solid #333',
                                    padding: '20px',
                                    "&:hover": { backgroundColor: '#e0e0e0' }
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', width: '40%' }}
                                >
                                    {item.shop.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', width: '25%' }}
                                >
                                    {item.price}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', width: '25%' }}
                                >
                                    <Rating value={item.rate} precision={0.5} readOnly />
                                </Typography>
                                <Box sx={{ color: 'red', display: 'flex', gap: '5px' }}>
                                    {edit &&
                                        <>
                                            <BuildCircleIcon onClick={() => handleEditItem(item.shop.id)} sx={{ cursor: "pointer" }} />
                                            <HighlightOffIcon onClick={() => handleDeleteItem(item.shop.id)} sx={{ cursor: "pointer" }} />
                                        </>
                                    }
                                </Box>
                            </Box>
                        ))}
                        {edit &&
                            <>
                                <Box sx={{ padding: '20px 0', textAlign: "center", borderBottom: '1px solid #333' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setOpen(true)}
                                        startIcon={<AddIcon />}
                                    >
                                        追加
                                    </Button>
                                </Box>
                                <Modal
                                    title="新しいアイテム"
                                    open={open}
                                    okText="追加"
                                    cancelText="キャンセル"
                                    onCancel={() => setOpen(false)}
                                    onOk={handleAddItem}
                                >
                                    <Form
                                        form={addForm}
                                        layout="vertical"
                                        name="add_form"
                                    >
                                        <Form.Item
                                            name="shop"
                                            label="売り場"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "このフィールドに入力してください。"
                                                }
                                            ]}
                                        >
                                            <Select
                                                allowClear
                                            >
                                                {shops.map((item: Shop) => (
                                                    <Select.Option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="price"
                                            label="値段"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "このフィールドに入力してください。"
                                                }
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                                <Modal
                                    title={prices.find(item => item.shop.id === selected)?.shop.name}
                                    open={!!selected}
                                    okText="編集"
                                    cancelText="キャンセル"
                                    onCancel={() => setSelected("")}
                                    onOk={handleUpdateItem}
                                >
                                    <Form
                                        form={editForm}
                                        layout="vertical"
                                        name="edit_form"
                                    >
                                        <Form.Item
                                            name="price"
                                            label="値段"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "このフィールドに入力してください。"
                                                }
                                            ]}
                                        >
                                            <Input type="number" />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </>
                        }
                    </Box>
                </Box>
                <Box sx={{ margin: "50px 0", display: "flex", justifyContent: "center", gap: "30px" }}>
                    {!edit ? (
                        <>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => setEdit(true)}
                                startIcon={<EditIcon />}
                            >
                                編集
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => showConfirmDeleteProduct()}
                                startIcon={<DeleteIcon />}
                            >
                                消去
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="contained" color="secondary" onClick={handleUpdateProduct}>編集</Button>
                            <Button variant="contained" color="secondary" onClick={() => setEdit(false)}>キャンセル</Button>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default AdminProductDetail;