import {TableHead,TableRow,TableCell,} from '@mui/material';

interface HeadCell {
	id: number;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 1,
		numeric: false,
		label: 'Название',
	},
	{
		id: 2,
		numeric: true,
		label: 'В наличии',
	},
	{
		id: 3,
		numeric: true,
		label: 'Количество',
	},
	{
		id: 4,
		numeric: true,
		label: 'Закуп.цена',
	},
    {
		id: 5,
		numeric: true,
		label: 'Общая сумма',
	},
	{
		id: 6,
		numeric: true,
		label: '',
	},
	{
		id: 7,
		numeric: true,
		label: '',
	}
];

export default function EnhancedTableHead() {

	return (
		<TableHead>
			<TableRow sx={{backgroundColor: 'blanchedalmond'}}>
				<TableCell padding="normal"></TableCell>
				{headCells.map((headCell) => (
					<TableCell
						sx={{fontFamily: 'monospace', fontSize: '18px'}}
						size="medium"
						key={headCell.id}
						align='center'
					>
                        {headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}