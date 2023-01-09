import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../requests/axiosInstance";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from 'antd';
import { Company } from "../../type/company";

function AdminCompanies() {
    const [totals, setTotals] = useState<Company[]>([]);
    const [listCompanies, setListCompanies] = useState<Company[]>([]);
    const [page, setPage] = useState<number>(1);
    // Add new company
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    // Edit
    const [selected, setSelected] = useState<string>("");

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

    // const handleOpen = () => {
    //     setOpen(true)
    // };
    // const handleClose = () => {
    //     setName("");
    //     setDescription("");
    //     setImage("");
    //     setOpen(false);
    //     setSelected("");
    // };
    // const handleAdd = () => {
    //     const newShop = {
    //         name: name,
    //         description: description,
    //         imageUrl: image,
    //     }
    //     axiosInstance.post("shop", newShop)
    //         .then(res => setTotals([...totals, res.data.data]));
    //     setName("");
    //     setDescription("");
    //     setImage("");
    //     setOpen(false);
    // }

    const handleEdit = (id: string) => {
        const selectedShop = listCompanies.find(item => item.id === id);
        setName(selectedShop?.name || "");
        setImage(selectedShop?.imageUrl || "");
        setSelected(id);
    }

    // const handleUppdate = () => {
    //     const newShop = {
    //         name: name,
    //         description: description,
    //         imageUrl: image,
    //     }
    //     axiosInstance.put(`shop/${selected}`, newShop)
    //         .then(res => {
    //             setTotals(totals.map(item => {
    //                 if (item.id === res.data.data.id) item = { ...res.data.data }
    //                 return item;
    //             }))
    //         });
    //     setName("");
    //     setDescription("");
    //     setImage("");
    //     setSelected("");
    // }

    const handleDelete = (id: string) => {
        axiosInstance.delete(`deliverer/${id}`);
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
                    運転会社
                </Typography>
                <Box sx={{ padding: "30px", display: "flex", justifyContent: "center" }}>
                    {/* <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        startIcon={<AddIcon />}
                    >
                        追加
                    </Button> */}
                    {/* <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>新しい売り場を追加</DialogTitle>
                        <DialogContent>
                            <TextField
                                value={name}
                                label="名前"
                                fullWidth
                                variant="standard"
                                margin="dense"
                                onChange={e => setName(e.target.value)}
                            />
                            <TextField
                                value={image}
                                label="写真リンク"
                                fullWidth
                                variant="standard"
                                margin="dense"
                                onChange={e => setImage(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="secondary" onClick={handleAdd}>追加</Button>
                            <Button variant="contained" color="secondary" onClick={handleClose}>キャンセル</Button>
                        </DialogActions>
                    </Dialog> */}
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
                                    onClick={() => handleDelete(com.id)}
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
                {/* <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={!!selected}
                    onClose={handleClose}
                >
                    <DialogTitle>売り場を編集</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={name}
                            label="名前"
                            fullWidth
                            variant="standard"
                            margin="dense"
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            value={image}
                            label="写真リンク"
                            fullWidth
                            variant="standard"
                            margin="dense"
                            onChange={e => setImage(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={handleUppdate}>編集</Button>
                        <Button variant="contained" color="secondary" onClick={handleClose}>キャンセル</Button>
                    </DialogActions>
                </Dialog> */}
            </Container>
        </Box>
    );
};

export default AdminCompanies;