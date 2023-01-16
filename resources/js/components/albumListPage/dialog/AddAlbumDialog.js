//import external libs
import React, { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    DialogTitle,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const validationSchema = yup.object({
    name: yup.string().required("กรุณากรอกข้อมูล"),
});

function AddAlbumDialog({
    onSave = () => {},
    onClose = () => {},
    details = { name: "" },
    open = false,
    mode = "add",
}) {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const loadData = () => {
    	if (mode === 'edit') {
    		setValue('name', details?.name)
    	}
    }

    const onSubmit = (data) => {
        onSave(data);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
    	if (open) {
    		setTimeout(loadData, 1000)
    	}
    }, [open])

    return (
        <>
            <Dialog open={open} maxWidth="xs" scroll="paper" fullWidth>
                <DialogTitle>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h5">
                            {mode === "add" && "เพิ่มอัลบั้ม"}
                            {mode === "edit" && "แก้ไขชื่ออัลบั้ม"}
                        </Typography>
                        {onClose ? (
                            <IconButton
                                aria-label="close"
                                sx={{ position: "absolute", right: 5 }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        ) : null}
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Box width={1} display="flex" flexDirection="column">
                        <Box mt={1}>
                            <Typography>ชื่ออัลบั้ม</Typography>
                        </Box>
                        <Box mt={1}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="โปรดระบุชื่ออัลบั้ม"
                                {...register('name')}
								name='name'
                                sx={{border: errors?.name ? '2px solid red': '' }}
                            />
                        </Box>
                        {errors?.name && (
                            <Box mt={1}>
                                <Typography sx={{color: errors?.name ? 'red': '' }}>
                                    {errors?.name?.message}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box
                        width={1}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                    >
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                บันทึก
                            </Button>
                        </Box>
                        <Box ml="auto">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleClose}
                            >
                                ปิด
                            </Button>
                        </Box>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddAlbumDialog;
