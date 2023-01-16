import React from 'react'
import { Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

function AlbumDataGrid({
	onSelect = () => { },
	onEdit = () => { },
	onDelete = () => { },
	list = [],
	view = false
}) {
	const handleRowClick = params => {
		onSelect(params.row)
	}

	const handleEditClick = params => {
		onEdit(params.row)
	}

	const columnDefinitions = [
		{
			field: 'no',
			headerName: '#',
			sortable: false,
			width: 50,
			type: 'number',
			valueGetter: params => {
				return params.api.getRowIndex(params.row.id) + 1
			}
		},
		{
			field: 'name',
			headerName: 'ชื่ออัลบั้ม',
			flex: 1,
			valueGetter: params => {
				return params.row?.name
			}
		},
		{
			field: 'createdAt',
			headerName: 'วันที่สร้าง',
			flex: 1,
			valueGetter: params => {
				return new Date(params.row?.createdAt).toLocaleString() || '-'
			}
		},
		{
			field: 'updatedAt',
			headerName: 'วันที่อัพเดต',
			flex: 1,
			valueGetter: params => {
				return new Date(params.row?.updatedAt).toLocaleString() || '-'
			}
		},
		{
			field: 'edit',
			headerName: ' ',
			hide: view,
			renderCell: function EditButton(params) {
				return (
					<Button
						variant='outlined'
						color='primary'
						className={''}
						size='small'
                        onClick={event => {
							event.ignore = true
							handleEditClick(params)
						}}
					>
						<Typography>แก้ไข</Typography>
					</Button>
				)
			}
		},
		{
			field: 'delete',
			headerName: ' ',
			hide: view,
			renderCell: function DeleteButton(params) {
				return (
					<Button
						variant='outlined'
						color='secondary'
						className={''}
						size='small'
                        onClick={event => {
							event.ignore = true
							onDelete(params)
						}}
						disabled={params.row.pic?.length > 0}
					>
						<Typography>ลบ</Typography>
					</Button>
				)
			},
		}
	]

	return (
		<>
			<DataGrid
				rows={list}
				autoHeight
				pagination
                onRowClick={(params, event) => {
					if (!event.ignore) {
						handleRowClick(params)
					}
				}}
				disableColumnMenu
				disableColumnSelector
				columns={columnDefinitions}
				hideFooter={list.length < 50}
			/>
		</>
	)
}

export default AlbumDataGrid
