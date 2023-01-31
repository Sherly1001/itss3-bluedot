import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Rating, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import axiosInstance from "../../requests/axiosInstance";
import { Price, Product } from "../../type/product";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from "../../type/category";
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Shop } from "../../type/shop";

function AdminProductDetail() {
    const [open, setOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();
    const [prices, setPrices] = useState<Price[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [shops, setShops] = useState<Shop[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [shopId, setShopId] = useState<string>("");
    const [selected, setSelected] = useState<string>("");
    const [catSelect, setCatSelect] = useState<string[]>([]);

    const params = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get(`item/${params.product_id}?page=1`)
            setProduct(res.data.data.items[0]);
            setPrices(res.data.data.items[0].prices);
            const res1 = await axiosInstance.get('shop');
            setShops(res1.data.data);
            const res2 = await axiosInstance.get('category');
            setCategories(res2.data.data);
        }
        fetchData();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancel = () => {
        setEdit(false);
    }

    const handleClose = () => {
        setPrice("");
        setShopId("");
        setOpen(false);
        setSelected("");
    }

    const handleChangeShop = (e: SelectChangeEvent) => {
        setShopId(e.target.value as string);
    }

    const handleAddItem = () => {
        if (edit) {
            const newPrice: Price = {
                price: +price,
                rate: 0,
                shop: shops.find(item => item.id === shopId) as Shop
            }
            if (!prices.find(item => item.shop.id === shopId)) {
                setPrices([newPrice, ...prices]);
            }
            setPrice("");
            setShopId("");
            setOpen(false);
        }
    }

    const handleEditItem = (id: string) => {
        if (edit) {
            setSelected(id);
        };
    }

    const handleUpdateItem = () => {
        if (edit) {
            const newPrices = prices.map(item => {
                if (item.shop.id === selected) item.price = +price;
                return item;
            })
            setPrices(newPrices);
            setSelected("");
        }
    }

    const handleDeleteItem = (id: string) => {
        if (edit) {
            setPrices(prices.filter(item => item.shop.id !== id));
        }
    }

    const handleChangeCategory = (e: SelectChangeEvent<typeof catSelect>) => {
        const {
            target: { value },
        } = e;
        setCatSelect(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleUpdateProduct = () => {
        const newProduct = {
            name: name || product?.name,
            description: description || product?.description,
            imageUrl: image || product?.imageUrl,
            categories: catSelect.length !== 0 ? catSelect : product?.categories.map(item => item.id),
            prices: prices.map((item: Price) => ({
                shop: item.shop.id,
                price: item.price,
            }))
        };
        axiosInstance.put(`item/${product?.id}`, newProduct)
            .then(res => {
                setProduct(res.data.data);
                setPrices(res.data.data.prices);
            });
        setEdit(false);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ padding: '50px' }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '30px' }}
                >
                    アイテム
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1' }}>
                        <img src={image || product?.imageUrl} style={{ height: '250px', width: '250px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {!edit ? product?.name : (
                                    <TextField
                                        color="secondary"
                                        value={name}
                                        fullWidth
                                        variant="standard"
                                        onChange={e => setName(e.target.value)}
                                        placeholder={product?.name}
                                    />
                                )}
                            </Typography>
                            {!edit ? (
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
                            ) : (
                                <FormControl variant="standard" sx={{ width: "350px" }} color="secondary">
                                    <InputLabel>カテゴリー</InputLabel>
                                    <Select
                                        multiple
                                        value={catSelect}
                                        onChange={handleChangeCategory}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {categories.map((item: Category) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                {!edit ? product?.description : (
                                    <TextField
                                        color="secondary"
                                        value={description}
                                        fullWidth
                                        variant="standard"
                                        onChange={e => setDescription(e.target.value)}
                                        placeholder={product?.description}
                                    />
                                )}
                            </Typography>
                            {edit && <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start' }}
                            >
                                <TextField
                                    color="secondary"
                                    value={image}
                                    fullWidth
                                    variant="standard"
                                    onChange={e => setImage(e.target.value)}
                                    placeholder={product?.imageUrl}
                                />
                            </Typography>}
                        </Box>
                    </Box>
                    <Box sx={{ flex: '2', display: 'flex', flexDirection: 'column' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                color: '#333',
                                fontSize: '18px',
                                borderBottom: '1px solid #333',
                                padding: '20px 50px',
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}
                            >
                                売り場
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '20%' }}
                            >
                                値段
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '20%' }}
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
                                    padding: '20px 50px',
                                    "&:hover": { backgroundColor: '#e0e0e0' }
                                }}
                                onClick={() => handleEditItem(item.shop.id)}
                            >
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}
                                >
                                    {item.shop.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', width: '20%' }}
                                >
                                    {item.price}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', width: '20%' }}
                                >
                                    <Rating defaultValue={item.rate} precision={0.5} readOnly />
                                </Typography>
                                {edit && <Box sx={{ marginLeft: '5%', color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteItem(item.shop.id)}>
                                    <HighlightOffIcon />
                                </Box>}
                            </Box>
                        ))}
                        {edit &&
                            <>
                                <Box sx={{ padding: '20px 0', textAlign: "center", borderBottom: '1px solid #333' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleOpen}
                                        startIcon={<AddIcon />}
                                    >
                                        追加
                                    </Button>
                                </Box>
                                <Dialog
                                    open={open}
                                    fullWidth
                                    maxWidth="sm"
                                    onClose={handleClose}
                                >
                                    <DialogTitle>新しいアイテム</DialogTitle>
                                    <DialogContent>
                                        <FormControl variant="standard" fullWidth color="secondary">
                                            <InputLabel>売り場</InputLabel>
                                            <Select
                                                value={shopId}
                                                onChange={handleChangeShop}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {shops.map((item: Shop) => (
                                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            color="secondary"
                                            value={price}
                                            label="値段"
                                            fullWidth
                                            variant="standard"
                                            onChange={e => setPrice(e.target.value)}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="contained" color="secondary" onClick={handleAddItem}>追加</Button>
                                        <Button variant="contained" color="secondary" onClick={handleClose}>キャンセル</Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog
                                    open={!!selected}
                                    fullWidth
                                    maxWidth="sm"
                                    onClose={handleClose}
                                >
                                    <DialogTitle>{prices.find(item => item.shop.id === selected)?.shop.name}</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            color="secondary"
                                            value={price}
                                            fullWidth
                                            variant="standard"
                                            onChange={e => setPrice(e.target.value)}
                                            placeholder={prices.find(item => item.shop.id === selected)?.price.toString()}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant="contained" color="secondary" onClick={handleUpdateItem}>追加</Button>
                                        <Button variant="contained" color="secondary" onClick={handleClose}>キャンセル</Button>
                                    </DialogActions>
                                </Dialog>
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
                                onClick={() => handleEdit()}
                                startIcon={<EditIcon />}
                            >
                                編集
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                // onClick={() => handleDelete(shop.id)}
                                startIcon={<DeleteIcon />}
                            >
                                消去
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="contained" color="secondary" onClick={handleUpdateProduct}>編集</Button>
                            <Button variant="contained" color="secondary" onClick={handleCancel}>キャンセル</Button>
                        </>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default AdminProductDetail;