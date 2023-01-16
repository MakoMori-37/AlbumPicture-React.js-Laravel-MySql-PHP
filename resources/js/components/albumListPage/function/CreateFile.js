import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import heic2any from "heic2any";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";

import { uploadFile } from "./uploadFile";

const CreateFile = ({
    file = null,
    filename = null,
	isEditable = true,
	onSuccess = () => {},
    requiredMessage = "รองรับไฟล์ .png, .jpg, .pdf ขนาดไม่เกิน 50M",
}) => {
    const [currentFile, setCurrentFile] = useState(null);
    const inputFile = useRef(null);

    const handleUploadFile = async (file, name) => {
        try {
            const formData = new FormData();
            formData.append("file", file, name);
            if (filename) {
                formData.append("filename", filename);
            }
            const {
                data: { data },
            } = await uploadFile(formData);
            setCurrentFile({ ...data });
            onSuccess(data)
        } catch (err) {
            console.log(
                err.response?.errors.file[0] ||
                    err.response?.data.message ||
                    err.message
            );
        }
    };

    const handleInputFileClick = () => {
        inputFile.current.click();
    };

    const handleInputFileChange = async (event) => {
        const file = event.target.files[0];
        console.log(file);

        if (!file) {
            return undefined;
        }

        if (
            !file.type.match("image/jpeg") &&
            !file.type.match("image/jpg") &&
            !file.type.match("image/png") &&
            !file.type.match("application/pdf") &&
            !file.type.match("application/vnd.ms-excel") &&
            !file.type.match("text/csv")
        ) {
            console.log("File Type not allow");
            return undefined;
        }

        if (file.size > 50 * 1024 * 1024) {
            console.log("File Size must less than 50 MB");
            return undefined;
        }

        const { name } = file;
        if (file.type.match(/heic.*/)) {
            console.log("heic");
            heic2any({
                blob: file,
                toType: "image/jpeg",
                quality: 1,
            }).then(async (result) => {
                console.log(result);
                handleUploadFile(result, name);
            });
        } else {
            handleUploadFile(file, name);
        }
    };

    const handleDownloadFileClick = () => {
        window.open(currentFile.path);
    };

    const handleImageLoad = (event) => {
        console.log(event)
        // console.log(event.target.width, event.target.height)
        // if(event.target.width > )
        // event.target.classList.remove(classes.imageError);
    };

    const handleImageError = (event) => {
        console.log("error");
        event.target.src = "/images/err.svg";
        // event.target.classList.add(classes.imageError);
    };

    useEffect(() => {
        if (file) {
            setCurrentFile(file);
        }
    }, [file]);

    const renderUpload = () => {
        return (
            <>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    px={3}
                    onClick={handleInputFileClick}
                >
                    <Box>
                        <img src="/images/download.png" />
                    </Box>
                </Box>
                <Box
                    mt={0}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    onClick={handleInputFileClick}
                >
                    <Typography>เลือกไฟล์</Typography>
                </Box>
                <Box
                    mt={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography>{requiredMessage}</Typography>
                </Box>
            </>
        );
    };

    const renderDisplay = () => {
        if (currentFile?.type?.includes("image")) {
            return (
                <>
                    <SRLWrapper>
                        <img
                            src={currentFile.path}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    </SRLWrapper>
                </>
            );
        } else {
            return (
                <>
                    <Box
                        width="100%"
                        height="300px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box>
                            <IconButton
                                aria-label="download"
                                onClick={handleDownloadFileClick}
                            >
                                <CloudDownloadIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <Typography>{`${currentFile?.name}`}</Typography>
                        </Box>
                    </Box>
                </>
            );
        }
    };

    return (
        <>
            <SimpleReactLightbox>
                <Box
                    width={1}
                    height={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    px={2}
                    py={2}
                    position="relative"
                >
                    {!currentFile && renderUpload()}
                    {currentFile && (
                        <>
                            <Box width={1} position="relative" overflow="auto">
                                {renderDisplay()}
                            </Box>
                            {/* {isEditable && (
                                <IconButton
                                    aria-label="upload"
                                    onClick={handleInputFileClick}
                                >
                                    <CloudUploadIcon />
                                </IconButton>
                            )}
                            <IconButton
                                aria-label="download"
                                onClick={handleDownloadFileClick}
                            >
                                <CloudDownloadIcon />
                            </IconButton> */}
                        </>
                    )}
                </Box>
            </SimpleReactLightbox>
            <input
                type="file"
                name="file"
                id="inputFile"
                ref={inputFile}
                onChange={handleInputFileChange}
            />
        </>
    );
};

export default CreateFile;
