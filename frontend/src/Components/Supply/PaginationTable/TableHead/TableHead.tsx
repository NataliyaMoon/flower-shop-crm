import { ISupplies } from '../../../../interfaces/ISupply';
import { visuallyHidden } from '@mui/utils';
import {
	Box,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
} from '@mui/material';

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof ISupplies,
	) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof ISupplies;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'source',
		numeric: false,
		disablePadding: true,
		label: 'Поставщик',
	},
	{
		id: 'target',
		numeric: true,
		disablePadding: false,
		label: 'Хранилище',
	},
	{
		id: 'item_name',
		numeric: true,
		disablePadding: false,
		label: 'Товар',
	},
	{
		id: 'qty',
		numeric: true,
		disablePadding: false,
		label: 'Количество',
	},
	{
		id: 'price',
		numeric: true,
		disablePadding: false,
		label: 'Цена за единицу',
	},
	{
		id: 'total_price',
		numeric: true,
		disablePadding: false,
		label: 'Общая цена',
	},
	{
		id: 'date',
		numeric: true,
		disablePadding: false,
		label: 'Дата',
	},
];

export default function EnhancedTableHead(props: EnhancedTableProps) {
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props;
	const createSortHandler =
		(property: keyof ISupplies) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox"></TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
