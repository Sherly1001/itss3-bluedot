import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../requests/axiosInstance";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pagination } from 'antd';
import { Category } from "../../type/category";

function AdminCategories() {
    const [totals, setTotals] = useState<Category[]>([]);
    const [listCategories, setListCategories] = useState<Category[]>([]);
    const [page, setPage] = useState<number>(1);
    // Add new category
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("");
    // Edit
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        axiosInstance.get('category')
            .then(res => {
                setTotals(res.data.data);
                if (page === 1) setListCategories(res.data.data.slice(0, 5));
            })
    }, []);

    useEffect(() => {
        const num = (page - 1) * 5;
        setListCategories(totals.slice(num, num + 5));
    }, [page, totals]);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setName("");
        setImage("");
        setOpen(false);
        setSelected("");
    };
    const handleAdd = () => {
        const newCategory = {
            name: name,
            imageUrl: image,
        }
        axiosInstance.post("category", newCategory)
            .then(res => {
                setTotals([res.data.data[0], ...totals]);
            });
        setName("");
        setImage("");
        setOpen(false);
    }

    const handleEdit = (id: string) => {
        const selectedCategory = listCategories.find(item => item.id === id);
        setName(selectedCategory?.name || "");
        setImage(selectedCategory?.imageUrl || "");
        setSelected(id);
    }

    const handleUppdate = () => {
        const newCategory = {
            name: name,
            imageUrl: image,
        }
        axiosInstance.put(`category/${selected}`, newCategory)
            .then(res => setTotals(totals.map(item => {
                if(item.id === res.data.data.id) item = {...res.data.data}
                return item;
            })));
        setName("");
        setImage("");
        setSelected("");
    }

    const handleDelete = (id: string) => {
        const deleteCategories = {
            ids: [id],
        }
        // axiosInstance.delete("category", deleteCategories);
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
                    カテゴリー
                </Typography>
                <Box sx={{ padding: "30px", display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        startIcon={<AddIcon />}
                    >
                        追加
                    </Button>
                    <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>新しいカテゴリー</DialogTitle>
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
                    {listCategories.map(cat => (
                        <Box
                            key={cat.id}
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
                                    名前：{cat.name}
                                </Typography>
                            </Box>
                            <Box>
                                <img src={cat.imageUrl} style={{ height: "100px" }} />
                            </Box>
                            <Box sx={{ position: "absolute", bottom: "30px", right: "30px", display: "flex", gap: "10px" }}>
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
                                    onClick={() => handleDelete(cat.id)}
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
                <Dialog
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
                </Dialog>
            </Container>
        </Box>
    );
};

export default AdminCategories;