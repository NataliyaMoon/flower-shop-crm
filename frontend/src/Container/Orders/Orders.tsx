import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import { IOrders } from '../../interfaces/IOrder';
import { useGetAllOrdersQuery } from '../../Store/services/orders';
import Loading from '../../Components/UI/Loading/Loading';

const columns: GridColDef[] = [
    { field: 'id', headerName: '№ ', width: 100 },
    {
        field: 'order_number',
        headerName: 'Номер заказа',
        type: 'string',
        width: 200,
    },
    {
        field: 'order_date',
        headerName: 'Дата/Время заказа',
        width: 250,
        valueFormatter: (date) => {
            if (!date?.value) return '';
            const localDate = new Date(date.value);
            localDate.setHours(localDate.getHours() + 6);
            return localDate.toLocaleString('ru-RU', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });
        },
    },
    {
        field: 'total_sales',
        headerName: 'Сумма заказа (в тенге)',
        type: 'number',
        width: 200,
    },
    {
        field: 'first_name',
        headerName: 'Автор заказа',
        type: 'number',
        width: 200,
    },
];

const Orders = () => {
    const navigate = useNavigate();
    const { data: rows, refetch, isLoading } = useGetAllOrdersQuery();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleOnCellClick = (params: any) => {
        navigate(`/orders/${params.row.id}`);
    };

    return (
        <Container>
            {isLoading && <Loading />}
            <Box sx={{ mt: 5, mb: 5 }}>
                <Typography variant="h4">История заказов</Typography>
            </Box>
            <Box sx={{ height: '100%', width: '100%' }}>
                {rows ? (
                    <DataGrid
                        rows={rows as IOrders[]}
                        columns={columns}
                        onCellClick={handleOnCellClick}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        disableRowSelectionOnClick
                    />
                ) : (
                    <Box sx={{ width: '100%' }}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Orders;
