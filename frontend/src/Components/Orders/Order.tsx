import { IOrder } from '../../interfaces/IOrder';
import { styled } from '@mui/material/styles';
import {TableCell, TableRow} from '@mui/material';
import  { tableCellClasses } from '@mui/material/TableCell';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


interface Props {
    order: IOrder[]
}

const Order = ({order}: Props) => {
  return (
    <>
     {order.map((order) => (
            <StyledTableRow key={order.bouquet_name}>
              <StyledTableCell component="th" scope="row">
                {order.bouquet_name}
              </StyledTableCell>
              <StyledTableCell align="right">{order.actual_price}</StyledTableCell>
              <StyledTableCell align="right">{order.total_sum}</StyledTableCell>
              <StyledTableCell align="right">{order.payment_type}</StyledTableCell>
            </StyledTableRow>
          ))}
    </>
  );
};

export default Order;