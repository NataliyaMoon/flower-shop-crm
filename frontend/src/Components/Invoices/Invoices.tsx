import { useGetAllActionsQuery } from '../../Store/services/supply';
import { IInvoice } from '../../interfaces/IInvoice';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import Loading from '../UI/Loading/Loading';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const columns: GridColDef[] = [
  { field: 'id', headerName: '№ накладной', width: 150 },
  {
    field: 'date',
    headerName: 'Дата',
    width: 180,
    valueFormatter: (date) => new Date(date?.value).toLocaleString(),
  },
  {
    field: 'total_sum',
    headerName: 'Сумма',
    type: 'number',
    width: 150,
  },
  {
    field: 'total_items',
    headerName: 'Товаров',
    type: 'number',
    width: 150,
  },
  {
    field: 'supplier_name',
    headerName: 'Поставщик',
    width: 180,
  },
  {
    field: 'storage_name',
    headerName: 'Точка продаж',
    width: 180,
  },
  {
    field: 'username',
    headerName: 'Сотрудник',
    width: 150,
  },
];

const Invoices = () => {
  const navigate = useNavigate()
  const { data: rows, refetch, isLoading } = useGetAllActionsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleOnCellClick = (params: any) => {
    navigate(`/invoices/${params.row.id}`);
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Typography variant="h4">Приходные накладные</Typography>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/new-invoice"
        >
          Создать накладную
        </Button>
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        {rows ? (
          <DataGrid
            rows={rows as IInvoice[]}
            columns={columns}
            onCellClick={handleOnCellClick}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
              toolbar: CustomToolbar,
            }}
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

export default Invoices;