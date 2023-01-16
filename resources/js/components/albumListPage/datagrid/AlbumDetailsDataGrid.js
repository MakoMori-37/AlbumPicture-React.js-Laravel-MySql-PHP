import React from "react";
import { Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function AlbumDetailsDataGrid({
    list = [],
    onEdit = () => {},
    onDelete = () => {},
}) {
    const handleEditClick = (params) => () => {
        onEdit(params.row);
    };

    const confirmDelete = (row) => () => {
        onDelete(row);
    };

    const columnDefinitions = [
        {
            field: "no",
            headerName: "#",
            sortable: false,
            width: 50,
            type: "number",
            valueGetter: (params) => {
                return params.api.getRowIndex(params.row.id) + 1;
            },
        },
        {
            field: "desc",
            headerName: "รายละเอียด",
            flex: 1,
            valueGetter: (params) => {
                return params.row?.desc;
            },
        },
        {
            field: "createdAt",
            headerName: "วันที่สร้าง",
            flex: 1,
            valueGetter: (params) => {
                return new Date(params.row?.createdAt).toLocaleString() || "-";
            },
        },
        {
            field: "updatedAt",
            headerName: "วันที่อัพเดต",
            flex: 1,
            valueGetter: (params) => {
                return new Date(params.row?.updatedAt).toLocaleString() || "-";
            },
        },
        {
            field: "details",
            headerName: " ",
            renderCell: function EditButton(params) {
                return (
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={handleEditClick(params)}
                    >
                        <Typography>แก้ไข</Typography>
                    </Button>
                );
            },
        },
        {
            field: "delete",
            headerName: " ",
            renderCell: function DeleteButton(params) {
                return (
                    <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={confirmDelete(params)}
                    >
                        <Typography>ลบ</Typography>
                    </Button>
                );
            },
        },
    ];

    return (
        <>
            <DataGrid
                rows={list}
                columns={columnDefinitions}
                autoHeight
                disableColumnSelector
                disableColumnMenu
                pagination
                hideFooter={list.length < 50}
            />
        </>
    );
}

export default AlbumDetailsDataGrid;
