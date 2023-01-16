import React, { useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CreateFile from "../function/CreateFile";

const validationSchema = yup.object({
    fileId: yup.number().required("กรุณาเลือกไฟล์").typeError("กรุณาเลือกไฟล์"),
    albumId: yup
        .string()
        .required("กรุณากรอกข้อมูล")
        .typeError("กรุณากรอกข้อมูล"),
    desc: yup.string().required("กรุณากรอกข้อมูล"),
});

function UploadFileDialog({
    open = false,
    selectedFile = null,
    onSave = () => {},
    onClose = () => {},
    selectedAlbum = null,
}) {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    console.log({selectedAlbum, selectedFile})
    const handleUploadFileSuccess = (file) => {
        console.log(file);
        if (file) {
            setValue("fileId", file.id);
        }
    };

    const onSubmit = (data) => {
        console.log("data submit", data);
        onSave(data);
        handleClose();
    };

    const handleClose = () => {
        onClose();
    };

    const loadData = () => {
        setValue("albumId", selectedAlbum.id);
        if (selectedFile) {
            const { fileId, desc } = selectedFile || {};

            setValue("fileId", fileId);
            setValue("desc", desc);
        }
    };

    useEffect(() => {
        if (open) {
            setTimeout(loadData, 1000);
        }
    }, [open]);

    return (
        <>
            <Dialog open={open} maxWidth="sm" scroll="paper" fullWidth>
                <DialogTitle>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h5">
                            {!selectedFile && "อัพโหลดไฟล์"}
                            {selectedFile && "แก้ไขไฟล์"}
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
                        <Box>
                            <CreateFile
                                file={selectedFile?.file || null}
                                onSuccess={handleUploadFileSuccess}
                            />
                            <Controller
                                name="fileId"
                                control={control}
                                render={({ field }) => <></>}
                            ></Controller>
                        </Box>
                        {errors.fileId && (
                            <Box mt={0}>
                                <Typography
                                    sx={{ color: errors?.fileId ? "red" : "" }}
                                >
                                    {errors.fileId?.message}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Box mt={1}>
                        <Typography>รายละเอียด</Typography>
                    </Box>
                    <Box mt={1}>
                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            variant="outlined"
                            {...register("desc")}
                            sx={{ border: errors?.desc ? "2px solid red" : "" }}
                        />
                    </Box>
                    {errors.desc && (
                        <Box mt={0}>
                            <Typography
                                sx={{ color: errors?.desc ? "red" : "" }}
                            >
                                {errors.desc?.message}
                            </Typography>
                        </Box>
                    )}
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
export default UploadFileDialog;
