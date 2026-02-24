/* eslint-disable react-hooks/exhaustive-deps */
import EnhancedTableToolbar from './TableToolbar/TableToolbar';
import EnhancedTableHead from './TableHead/TableHead';
import { useGetSuppliesBetweenMutation } from '../../../Store/services/supply';
import { ISupplies } from '../../../interfaces/ISupply';
import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { DeleteForever } from '@mui/icons-material';
import { Button } from '@mui/material';

type Order = 'asc' | 'desc';

export default function PaginationTable() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof ISupplies>('target');
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [rows, setRows] = React.useState<Array<ISupplies> | []>([]);
	const [getSuppliesBetween] = useGetSuppliesBetweenMutation();

	const initialRows = async () => {
		const result = await getSuppliesBetween({ start: 1, end: 5 });
		setRows((result as { data: Array<ISupplies> }).data);
	};

	useEffect(() => {
		initialRows();
	}, []);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof ISupplies,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {};

	const handleChangePage = async (event: unknown, newPage: number) => {
		if (newPage > page && newPage * rowsPerPage === rows.length) {
			const result = await getSuppliesBetween({
				start: newPage * rowsPerPage + 1,
				end: (newPage + 1) * rowsPerPage,
			});
			const resultData = (result as { data: Array<never> }).data;
			setRows((prev) => prev.concat(resultData));
		}

		setPage(newPage);
	};

	const handleChangeRowsPerPage = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		const result = await getSuppliesBetween({
			start: 1,
			end: parseInt(event.target.value),
		});
		setRows((result as { data: Array<ISupplies> }).data);
		setPage(0);
	};

	const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	};

	const onClickDelete = (
		event: React.ChangeEvent<HTMLButtonElement>,
		id: number,
	) => {};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[rows, page, rowsPerPage],
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
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
							{rows.length > 0
								? visibleRows.map((row, index) => {
										const labelId = `enhanced-table-checkbox-${index}`;
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row.id}
												sx={{ cursor: 'pointer' }}
											>
												<TableCell align="left">{row.id}</TableCell>
												<TableCell
													component="th"
													id={labelId}
													scope="row"
													padding="none"
												>
													{row.source}
												</TableCell>
												<TableCell align="right">{row.target}</TableCell>
												<TableCell align="right">{row.item_name}</TableCell>
												<TableCell align="right">{row.qty}</TableCell>
												<TableCell align="right">{row.price}</TableCell>
												<TableCell align="right">{row.total_price}</TableCell>
												<TableCell align="right">
													{new Date(row.date).toLocaleDateString()}
												</TableCell>
												<TableCell>
													<Button
														style={{ maxWidth: '20' }}
														variant="contained"
														color="error"
														// onClick={onClickDelete}
														aria-label="settings"
													>
														<DeleteForever />
													</Button>
												</TableCell>
											</TableRow>
										);
								  })
								: []}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length > 0 ? parseInt(rows[0].total_count) : -1}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Уменьшить отступы"
			/>
		</Box>
	);
}
