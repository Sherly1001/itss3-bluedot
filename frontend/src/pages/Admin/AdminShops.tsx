import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../requests/axiosInstance";
import { Shop } from "../../type/shop";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from 'antd';

function AdminShops() {
    const [totals, setTotals] = useState<Shop[]>([]);
    const [listShops, setListShops] = useState<Shop[]>([]);
    const [page, setPage] = useState<number>(1);
    // Add new shop
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string>("");
    // Edit
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        axiosInstance.get('shop')
            .then(res => {
                setTotals(res.data.data);
                if (page === 1) setListShops(res.data.data.slice(0, 5));
            })
    }, []);

    useEffect(() => {
        const num = (page - 1) * 5;
        setListShops(totals.slice(num, num + 5));
    }, [page, totals]);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setName("");
        setDescription("");
        setImage("");
        setOpen(false);
        setSelected("");
    };
    const handleAdd = () => {
        const newShop = {
            name: name,
            description: description,
            imageUrl: image,
        }
        axiosInstance.post("shop", newShop)
            .then(res => setTotals([...totals, res.data.data]));
        setName("");
        setDescription("");
        setImage("");
        setOpen(false);
    }

    const handleEdit = (id: string) => {
        const selectedShop = listShops.find(item => item.id === id);
        setName(selectedShop?.name || "");
        setDescription(selectedShop?.description || "");
        setImage(selectedShop?.imageUrl || "");
        setSelected(id);
    }

    const handleUppdate = () => {
        const newShop = {
            name: name,
            description: description,
            imageUrl: image,
        }
        axiosInstance.put(`shop/${selected}`, newShop)
            .then(res => {
                setTotals(totals.map(item => {
                    if (item.id === res.data.data.id) item = { ...res.data.data }
                    return item;
                }))
            });
        setName("");
        setDescription("");
        setImage("");
        setSelected("");
    }

    const handleDelete = (id: string) => {
        axiosInstance.delete(`shop/${id}`);
        setTotals(totals.filter(item => item.id !== id));
    }

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
                    ?????????
                </Typography>
                <Box sx={{ padding: "30px", display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        startIcon={<AddIcon />}
                    >
                        ??????
                    </Button>
                    <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>???????????????????????????</DialogTitle>
                        <DialogContent>
                            <TextField
                                value={name}
                                label="??????"
                                fullWidth
                                variant="standard"
                                margin="dense"
                                onChange={e => setName(e.target.value)}
                            />
                            <TextField
                                value={description}
                                label="??????"
                                fullWidth
                                variant="standard"
                                margin="dense"
                                onChange={e => setDescription(e.target.value)}
                            />
                            <TextField
                                value={image}
                                label="???????????????"
                                fullWidth
                                variant="standard"
                                margin="dense"
                                onChange={e => setImage(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="secondary" onClick={handleAdd}>??????</Button>
                            <Button variant="contained" color="secondary" onClick={handleClose}>???????????????</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px"
                    }}
                >
                    {listShops.map(shop => (
                        <Box
                            key={shop.id}
                            sx={{
                                width: "70%",
                                border: "1px solid #333",
                                borderRadius: "5px",
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "30px",
                                paddingBottom: "100px",
                                position: "relative",
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start' }}
                                >
                                    ?????????{shop.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}
                                >
                                    ?????????{shop.description}
                                </Typography>
                            </Box>
                            <Box>
                                <img src={shop.imageUrl} style={{ height: "100px" }} />
                            </Box>
                            <Box sx={{ position: "absolute", bottom: "30px", right: "30px", display: "flex", gap: "10px" }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleEdit(shop.id)}
                                    startIcon={<EditIcon />}
                                >
                                    ??????
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(shop.id)}
                                    startIcon={<DeleteIcon />}
                                >
                                    ??????
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
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={!!selected}
                    onClose={handleClose}
                >
                    <DialogTitle>??????????????????</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            label="??????"
                            fullWidth
                            variant="standard"
                            margin="dense"
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            value={description}
                            label="??????"
                            fullWidth
                            variant="standard"
                            margin="dense"
                            onChange={e => setDescription(e.target.value)}
                        />
                        <TextField
                            value={image}
                            label="???????????????"
                            fullWidth
                            variant="standard"
                            margin="dense"
                            onChange={e => setImage(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={handleUppdate}>??????</Button>
                        <Button variant="contained" color="secondary" onClick={handleClose}>???????????????</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default AdminShops;