import { useGetInvoceByidQuery } from '../../Store/services/supply';
import Invoice from '../../Components/Invoices/Invoice';
import { GlobalTheme } from '../..';
import {
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useParams } from 'react-router';
import { ThemeProvider, styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const InvoiceContainer = () => {
    const { id } = useParams();
    const { data: invoice } = useGetInvoceByidQuery(id as string);

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container>
                {invoice && (
                    <Grid>
                        <Typography variant='h4'>
                            Приходная накладная № {id} от{' '}
                            {new Date(invoice[0].date).toISOString().replace('T', ' ').split('.')[0]}
                        </Typography>
                    </Grid>
                )}
                <Grid margin={1}>
                    <TableRow>
                        <TableCell>Контрагент</TableCell>
                        <TableCell>{invoice && invoice[0].source_supplier_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Торговая точка</TableCell>
                        <TableCell>{invoice && invoice[0].target_storage_name}</TableCell>
                    </TableRow>
                </Grid>
                <Grid margin={1}>
                    <Typography variant='h5'>Товары</Typography>
                </Grid>
                <TableContainer component={Paper}>
                    <Table aria-label='customized table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Название</StyledTableCell>
                                <StyledTableCell align='right'>Количество</StyledTableCell>
                                <StyledTableCell align='right'>Единицы измерения</StyledTableCell>
                                <StyledTableCell align='right'>Закуп. цена</StyledTableCell>
                                <StyledTableCell align='right'>Сумма</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{invoice && <Invoice invoice={invoice} />}</TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default InvoiceContainer;
