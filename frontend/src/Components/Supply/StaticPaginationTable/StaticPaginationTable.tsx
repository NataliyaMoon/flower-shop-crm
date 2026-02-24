import EnhancedTableHead from './StaticTableHead/StaticTableHead';
import TablePaginationActions from './StaticPaginationActions/StaticPaginationActions';
import { ISupplies } from '../../../interfaces/ISupply';
import { useGetAllSuppliersQuery } from '../../../Store/services/suppliers';
import { useGetSuppliesSupplierMutation } from '../../../Store/services/supply';
import * as React from 'react';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Paper,
	InputLabel,
	MenuItem,
	FormControl,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Order = 'asc' | 'desc';

const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {};

export default function CustomPaginationActionsTable() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [page, setPage] = React.useState(0);
	const [orderBy, setOrderBy] = React.useState<keyof ISupplies>('target');
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [dense, setDense] = React.useState(false);
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [rows, setRows] = React.useState<ISupplies[] | []>([]);
	const [supplierID, setSupplierID] = React.useState('');
	const { data, isLoading } = useGetAllSuppliersQuery();
	const [getSuppliesSupplier] = useGetSuppliesSupplierMutation();

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof ISupplies,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChange = async (event: SelectChangeEvent) => {
		const result = await getSuppliesSupplier(parseInt(event.target.value));

		if (!(result as { error: object }).error) {
			setRows((result as { data: Array<ISupplies> }).data);
		}
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage: any = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ minWidth: 120, marginBottom: 3, marginTop: 2 }}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">
						Выберите поставщика
					</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={supplierID}
						label="Поставщик"
						onChange={handleChange}
					>
						{data &&
							data.map((item) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name_supplier}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Box>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{(rowsPerPage > 0
								? rows.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage,
								  )
								: rows
							).map((row) => (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell component="th" scope="row">
										{row.source}
									</TableCell>
									<TableCell style={{ width: 160 }} align="right">
										{row.target}
									</TableCell>
									<TableCell style={{ width: 160 }} align="right">
										{row.item_name}
									</TableCell>
									<TableCell style={{ width: 160 }} align="right">
										{row.qty}
									</TableCell>
									<TableCell style={{ width: 160 }} align="right">
										{row.price}
									</TableCell>
									<TableCell style={{ width: 160 }} align="right">
										{row.total_price}
									</TableCell>
									<TableCell style={{ width: 160 }} align="right">
										{new Date(row.date).toLocaleDateString()}
									</TableCell>
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					style={{ width: '100%' }}
					rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
					colSpan={3}
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					SelectProps={{
						inputProps: {
							'aria-label': 'rows per page',
						},
						native: true,
					}}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					ActionsComponent={TablePaginationActions}
				/>
			</Paper>
		</Box>
	);
}
