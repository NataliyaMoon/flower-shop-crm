import { InvoiceById } from '../../interfaces/IInvoice';
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
    invoice: InvoiceById[]
}

const  Invoice = ({invoice}: Props) => {
  return (
    <>
     {invoice.map((invoice) => (
            <StyledTableRow key={invoice.item_name}>
              <StyledTableCell component="th" scope="row">
                {invoice.item_name}
              </StyledTableCell>
              <StyledTableCell align="right">{invoice.qty}</StyledTableCell>
              <StyledTableCell align="right">Штука</StyledTableCell>
              <StyledTableCell align="right">{invoice.price}</StyledTableCell>
              <StyledTableCell align="right">{invoice.total_price}</StyledTableCell>
            </StyledTableRow>
          ))}
    </>
  );
};

export default Invoice;