import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
} from "@mui/material";
import { KeyboardBackspace as KeyboardBackspaceIcon } from "@mui/icons-material";

import { fetchAlbum } from "./function/fetchAlbum";
import { fetchAlbumDetail } from "./function/fetchAlbumDetail";
import { createAlbum } from "./function/createAlbum";
import { updateAlbum } from "./function/updateAlbum";
import { deleteAlbum } from "./function/deleteAlbum";
import { createPicture } from "./function/createPicture";
import { updatePicture } from "./function/updatePicture";
import { deletePicture } from "./function/deletePicture";

import AlbumDataGrid from "./datagrid/AlbumDataGrid";
import AlbumDetailsDataGrid from "./datagrid/AlbumDetailsDataGrid";
import AddAlbumDialog from "./dialog/AddAlbumDialog";
import UploadFileDialog from "./dialog/UploadFileDialog";

const AlbumListPage = () => {
    const [mode, setMode] = useState(""); // mode: 'add', 'edit'
    const [albumList, setAlbumList] = useState([]);
    const [selectAlbum, setSelectAlbum] = useState({});
    const [albumDetail, setAlbumDetail] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [isOpenFileDialog, setOpenFileDialog] = useState(false);
    const [addAlbumDialogOpen, setAddAlbumDialogOpen] = useState(false);
    const [filter, setFilter] = useState({
        searchWord: "",
    });
    console.log({ albumList });
    const loadAlbumList = async () => {
        try {
            const {
                data: { data },
            } = await fetchAlbum(filter);
            setAlbumList([...data]);
        } catch (err) {
            console.log(err.response?.data.message || err.message);
        }
    };

    const handleUpdateAlbum = async (album) => {
        if (mode === "add") {
            try {
                await createAlbum({ name: album.name });
                loadAlbumList();
            } catch (err) {
                console.log(err.response?.data.message || err.message);
            }
        } else {
            try {
                await updateAlbum(selectAlbum.id, { name: album.name });
                loadAlbumList();
            } catch (err) {
                console.log(err.response?.data.message || err.message);
            }
        }
    };

    const handleDeleteAlbum = async (album) => {
        try {
            await deleteAlbum(album.id);
            loadAlbumList();
        } catch (err) {
            console.log(err.response?.data.message || err.message);
        }
    };

    const loadDetail = async (id = selectedAlbum.id) => {
    	try {
    		const {
    			data: { data }
    		} = await fetchAlbumDetail(id)
    		setAlbumDetail({ ...data })
    	} catch (err) {
    		console.log(err.response?.data.message || err.message)
    	}
    }

    const handleDeletePicture= async data => {
    	try {
    		await deletePicture(data.id)
    		loadAlbumList()
    	} catch (err) {
    		console.log(err.response?.data.message || err.message)
    	}
    }

    const handlePictureSave = async data => {
    	try {
    		selectedFile
    			? await updatePicture(selectedFile.id, data)
    			: await createPicture(data)
    		loadDetail()
    	} catch (err) {
    		console.log(err.response?.data.message || err.message)
    	}
    }

    const handleSearchWordKeyPress = (e) => {
        if (e.charCode === 13) {
            handleFilterClick();
        }
    };

    const handleFilterChange = (name) => (e) => {
        setFilter({ [name]: e.target.value });
    };

    const handleFilterClick = () => {
        loadAlbumList();
    };

    const handleAlbumSelect = (data) => {
        setSelectedAlbum(data);
        loadDetail(data.id)
    };

    const handleAddAlbumClick = () => {
        setMode("add");
        setAddAlbumDialogOpen(true);
    };

    const handleEditAlbum = (data) => {
        setMode("edit");
        setSelectAlbum(data);
        setAddAlbumDialogOpen(true);
    };

    const handleAddalbumClose = () => {
        setMode("");
        setAddAlbumDialogOpen(false);
    };

    const handleAddNewFileClick = () => {
        setOpenFileDialog(true);
    };

    const handleFileClose = () => {
        setSelectedFile(null);
        setOpenFileDialog(false);
    };

    const handleEditFile = (data) => {
        console.log("data for edit", data);
        setSelectedFile(data);
        setOpenFileDialog(true);
    };

    const handleBackClick = () => {
        setSelectedAlbum(null);
        setAlbumDetail({});
    };

    useEffect(() => {
        loadAlbumList();
    }, []);

    return (
        <>
            <Container maxWidth={false}>
                <Box width={1} display="flex" flexDirection="column" py={3}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        {!selectedAlbum && (
                            <Box>
                                <Typography variant="h5">
                                    รายการอัลบั้ม
                                </Typography>
                            </Box>
                        )}
                        {selectedAlbum && (
                            <>
                                <Box onClick={handleBackClick} mr={1}>
                                    <IconButton
                                        aria-label="back"
                                        color="primary"
                                    >
                                        <KeyboardBackspaceIcon />
                                    </IconButton>
                                </Box>
                                <Box>
                                    <Typography
                                    >
                                        รูปภาพอัลบั้ม {selectedAlbum.name}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Box
                        mt={2}
                        display="flex"
                        flexDirection="row"
                        alignItems="flex-end"
                    >
                        <Box flexGrow={1}>
                            <TextField
                                label="คำค้นหา"
                                size="small"
                                fullWidth
                                value={filter.searchWord}
                                onChange={handleFilterChange("searchWord")}
                                onKeyPress={handleSearchWordKeyPress}
                            ></TextField>
                        </Box>
                        <Box ml={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleFilterClick}
                            >
                                <Typography>ค้นหา</Typography>
                            </Button>
                        </Box>
                        {!selectedAlbum && (
                            <Box ml={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddAlbumClick}
                                >
                                    <Typography>เพิ่มอัลบั้ม</Typography>
                                </Button>
                            </Box>
                        )}

                        {selectedAlbum && (
                            <Box ml={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddNewFileClick}
                                >
                                    <Typography>อัพโหลด</Typography>
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Box mt={2}>
                        {!selectedAlbum && (
                            <Box>
                                <AlbumDataGrid
                                    list={albumList}
                                    onSelect={handleAlbumSelect}
                                    onEdit={handleEditAlbum}
                                    onDelete={handleDeleteAlbum}
                                />
                            </Box>
                        )}
                        {selectedAlbum && (
                            <Box
                                width={1}
                                display="flex"
                                flexDirection="column"
                            >
                                <Box>
                                    <AlbumDetailsDataGrid
                                        list={albumDetail?.pic || []}
                                        onEdit={handleEditFile}
                                        onDelete={handleDeletePicture}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {selectedAlbum && (
                        <Box
                            mt={2}
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                        >
                            <Box>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleBackClick}
                                >
                                    ย้อนกลับ
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>
            <AddAlbumDialog
                mode={mode}
                details={selectAlbum}
                open={addAlbumDialogOpen}
                onClose={handleAddalbumClose}
                onSave={handleUpdateAlbum}
            />

            <UploadFileDialog
                open={isOpenFileDialog}
                onClose={handleFileClose}
                selectedAlbum={selectedAlbum}
                onSave={handlePictureSave}
                selectedFile={selectedFile}
            />
        </>
    );
};

export default AlbumListPage;
