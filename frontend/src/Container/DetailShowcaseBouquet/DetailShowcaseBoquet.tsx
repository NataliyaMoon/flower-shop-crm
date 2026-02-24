import React, { useState } from 'react'
import {
  Button,
  Container,
  Grid,
  CardMedia,
  Typography,
  ThemeProvider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { GlobalTheme } from '../..'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  useGetAvailableBouquetByIdQuery,
  useWriteOfBouquetMutation,
  useSendBouquetBasketMutation,
} from '../../Store/services/availableBouquets'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import Loading from '../../Components/UI/Loading/Loading'

const DetailShowcaseBouquets = () => {
  const params = useParams()
  const { data: bouquets, isLoading } = useGetAvailableBouquetByIdQuery(
    params.id as string,
  )

  const [writeOfBouquet] = useWriteOfBouquetMutation()
  const [sendBasket] = useSendBouquetBasketMutation()
  const navigate = useNavigate()
  const sendBaskets = async (order_number: string) => {
    await sendBasket(order_number)
    await navigate('/florist_page')
  }
  const delBouquet = async (order_number: string) => {
    await writeOfBouquet(order_number)
    await navigate('/available_bouquets')
  }

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container>
        {isLoading && <Loading/>}
        {bouquets ? (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                height="300"
                width="300"
                image={
                  bouquets[0].image_bouquet
                    ? bouquets[0].image_bouquet
                    : '../no-photo.png'
                }
                alt={bouquets[0].bouquet_name}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {bouquets[0].bouquet_name}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    № {bouquets[0].invoice_number}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {
                      new Date(bouquets[0].date)
                        .toISOString()
                        .replace('T', ' ')
                        .split('.')[0]
                    }
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {bouquets[0].username}
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Название</TableCell>
                      <TableCell align="right">Цена</TableCell>
                      <TableCell align="right">Количество</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bouquets &&
                      bouquets.map((bouquet) => (
                        <TableRow key={bouquet.item_name}>
                          <TableCell align="left">
                            {bouquet.item_name}
                          </TableCell>
                          <TableCell align="right">{bouquet.price} ₸</TableCell>
                          <TableCell align="right">{bouquet.qty} шт</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid
                container
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                sx={{ mt: 4 }}
              >
                <Grid>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mr: 3 }}
                    onClick={() => delBouquet(bouquets[0].invoice_number)}
                  >
                    <DeleteOutlinedIcon />
                    Списать букет
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => sendBaskets(bouquets[0].invoice_number)}
                  >
                    <AddShoppingCartOutlinedIcon />В корзину
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography>Нет информации по букету</Typography>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default DetailShowcaseBouquets
