import React, { useEffect, useState } from 'react'
import {
  useGetAllAvailableBouquetsQuery,
  useSendBouquetBasketMutation,
} from '../../Store/services/availableBouquets'
import {
  Avatar,
  CardHeader,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  Grid,
  CardMedia,
  Typography,
  CardActions,
  Skeleton,
  ThemeProvider,
} from '@mui/material'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import { red } from '@mui/material/colors'
import { GlobalTheme } from '../..'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import noImage from '../../assets/no-photo.png'
import Loading from '../../Components/UI/Loading/Loading'

const ShowcaseBouquets = () => {
  const [sendBasket] = useSendBouquetBasketMutation()
  const { data, isLoading, refetch } = useGetAllAvailableBouquetsQuery()

  useEffect(() => {
    refetch()
  }, [refetch])
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (event: any) => {
    setFilterTerm(event.target.value)
  }

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const filteredData = data?.filter(
    (item: { name_bouquet: string; order_number: string }) => {
      return (
        item.name_bouquet.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.order_number.toLowerCase().includes(filterTerm.toLowerCase())
      )
    },
  )

  const sortedData = filteredData?.sort(
    (
      a: { added_date: string | number | Date },
      b: { added_date: string | number | Date },
    ) => {
      let dateA = new Date(a.added_date)
      let dateB = new Date(b.added_date)
      if (sortOrder === 'asc') {
        return dateA.getTime() - dateB.getTime()
      } else {
        return dateB.getTime() - dateA.getTime()
      }
    },
  )
  const sendBaskets = async (order_number: string) => {
    await sendBasket(order_number)
    await navigate('/florist_page')
  }
  return (
    <ThemeProvider theme={GlobalTheme}>
      {isLoading && <Loading />}
      <Container>
        <Grid
          sx={{ pb: 3 }}
          container
          alignItems="flex-start"
          justifyContent="center"
        >
          <TextField
            label="Название букета"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mr: 3 }}
          />
          <TextField
            label="Номер заказа"
            value={filterTerm}
            onChange={handleFilterChange}
            sx={{ mr: 3 }}
          />
          <Button variant="contained" onClick={handleSortChange}>
            По дате {sortOrder === 'asc' ? 'возрастания' : 'убывания'}
          </Button>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          sx={{ flexWrap: 'wrap' }}
        >
          {sortedData?.map(
            (item: {
              id: React.Key | null | undefined
              username: string
              name_bouquet: string | undefined
              added_date: string | number | Date
              order_number:
              | string
              | number
              | boolean
              | React.ReactElement<
                any,
                string | React.JSXElementConstructor<any>
              >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined
              image_bouquet: string | undefined
              actual_price:
              | string
              | number
              | boolean
              | React.ReactElement<
                any,
                string | React.JSXElementConstructor<any>
              >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined
            }) => (
              <Card key={item.id} sx={{ width: 350, m: 1 }}>
                <CardHeader
                  avatar={
                    isLoading ? (
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.username.charAt(0)}
                      </Avatar>
                    )
                  }
                  title={
                    isLoading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                      item.name_bouquet
                    )
                  }
                  subheader={
                    isLoading ? (
                      <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                      new Date(item.added_date)
                        .toISOString()
                        .replace('T', ' ')
                        .split('.')[0]
                    )
                  }
                />
                <Link to={`/detailBouquet/${item.order_number}`}>
                  {isLoading ? (
                    <Skeleton
                      sx={{ height: 194 }}
                      animation="wave"
                      variant="rectangular"
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      height="250"
                      width="250"
                      image={
                        item.image_bouquet
                          ? item.image_bouquet
                          : noImage
                      }
                      alt={item.name_bouquet}
                    />
                  )}
                  <CardContent>
                    {isLoading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Номер заявки: {item.order_number}
                      </Typography>
                    )}
                  </CardContent>
                </Link>
                <CardActions disableSpacing>
                  {isLoading ? (
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="30%"
                      sx={{ pl: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ pl: 1 }}
                    >
                      Цена: {item.actual_price} ₸
                    </Typography>
                  )}
                </CardActions>
                {isLoading ? (
                  <Skeleton
                    animation="wave"
                    width={150}
                    height={60}
                    sx={{ ml: 1 }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{ ml: 1 }}
                    onClick={() => sendBaskets(item.order_number as string)}
                  >
                    <AddShoppingCartOutlinedIcon sx={{ mr: 1 }} />
                    Корзина
                  </Button>
                )}
              </Card>
            ),
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default ShowcaseBouquets
