import Order from '../../Components/Orders/Order';
import { useGetOrderByIdQuery, useGetAllOrdersQuery } from '../../Store/services/orders';
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

const OrdersDetails = () => {
    const { id } = useParams();
    const { data: order } = useGetOrderByIdQuery(id as string);
    const { data: orders } = useGetAllOrdersQuery();

    const orderNum = order && order.length > 0 ? orders?.find((id) => id.id === order[0].general_order_id) : 0;

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container>
                {order && (
                    <Grid>
                        <Typography variant='h4'>
                            Детали заказа от{' '}
                            {(() => {
                                const addedDate = new Date(order[0].added_date);
                                addedDate.setHours(addedDate.getHours() + 6);

                                return addedDate.toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                });
                            })()}
                        </Typography>
                    </Grid>
                )}
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TableRow>
                            <TableCell>Номер заказа</TableCell>
                            {orderNum ? <TableCell>{orderNum.order_number}</TableCell> : null}
                        </TableRow>
                        <TableRow>
                            <TableCell>Заказ выполнил</TableCell>
                            <TableCell>{order && order[0].first_name}</TableCell>
                        </TableRow>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Typography variant='h5'>Товары</Typography>
                </Grid>
                <TableContainer component={Paper}>
                    <Table aria-label='customized table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Название букета</StyledTableCell>
                                <StyledTableCell align='right'>Цена по прайсу</StyledTableCell>
                                <StyledTableCell align='right'>Цена продажи</StyledTableCell>
                                <StyledTableCell align='right'>Способ оплаты</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{order && <Order order={order} />}</TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>
    );
};

export default OrdersDetails;
