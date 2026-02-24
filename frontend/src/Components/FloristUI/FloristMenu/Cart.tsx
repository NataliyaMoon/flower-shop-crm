import { ItemsOnCart } from '../FloristMenu/FloristMenu';
import CartItem from '../../UI/Cart/CartItem';
import { IAvailableBouquet } from '../../../interfaces/IAvailableBouquets';
import CartBouquet from '../../UI/Cart/CartBouquet';
import { Delete, StoreRounded, YardRounded } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography, TableContainer, TableBody } from '@mui/material';
import { ChangeEvent } from 'react';

interface Props {
    items: ItemsOnCart[];
    bouquets: IAvailableBouquet[];
    clickNavigate: () => void;
    removeItem: (i: number) => void;
    increaseItem: (i: number) => void;
    decreaseItem: (i: number) => void;
    changePrice: (i: number, e: ChangeEvent<HTMLInputElement>) => void;
    activeItem: (i: number) => void;
    activeIndex: number | null;
    bouquetActualPriceChange: (i: number, e: ChangeEvent<HTMLInputElement>) => void;
    showPayment: () => void;
}

const Cart = ({
    items,
    clickNavigate,
    removeItem,
    increaseItem,
    decreaseItem,
    changePrice,
    activeItem,
    activeIndex,
    bouquets,
    bouquetActualPriceChange,
    showPayment,
}: Props) => {
    return (
        <Container sx={{ width: '36%', position: 'fixed', right: 0 }}>
            <Grid container>
                <Grid>
                    <Typography color='primary' variant='h6'>
                        {items?.length > 0 && bouquets?.length === 0 ? 'Ассортимент' : null}
                        {bouquets?.length > 0 && items?.length === 0 ? 'Букеты' : null}
                    </Typography>
                </Grid>
                <Grid minHeight={450} sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 450, overflow: 'scroll' }}>
                        <TableBody>
                            {items && items?.length >= 1
                                ? items?.map((item, i) => {
                                      return (
                                          <CartItem
                                              key={i}
                                              item={item}
                                              increaseItem={() => increaseItem(i)}
                                              decreaseItem={() => decreaseItem(i)}
                                              removeItem={() => removeItem(i)}
                                              changePrice={(e) => changePrice(i, e)}
                                              activeItem={() => activeItem(i)}
                                              editBarDisplay={i === activeIndex ? true : false}
                                          />
                                      );
                                  })
                                : null}
                            {items?.length  >= 0 &&
                                bouquets?.length &&
                                bouquets?.map((bouquet, i) => {
                                    return (
                                        <CartBouquet
                                            key={i}
                                            image={bouquet.image_bouquet}
                                            id={bouquet.id}
                                            name={bouquet.name_bouquet}
                                            price={bouquet.actual_price}
                                            actualPriceChange={(e) => bouquetActualPriceChange(i, e)}
                                            total_sum={bouquet.total_sum}
                                        />
                                    );
                                })}
                        </TableBody>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid
                container
                minHeight={140}
                sx={{ display: 'flex', position: 'relative', background: 'black', color: 'white' }}
            >
                <Box sx={{ display: 'flex', margin: 2 }}>
                    <Grid item sx={{ margin: 1 }} onClick={clickNavigate}>
                        <StoreRounded fontSize='large' />
                        <Typography variant='body1'>Витрина</Typography>
                    </Grid>
                    <Typography sx={{ marginLeft: '10px', marginRight: '40px' }} variant='h6'>
                        Итого:
                    </Typography>
                    <Typography variant='h6'>
                        {(items && items.length > 0) || (bouquets && bouquets.length > 0)
                            ? (
                                  (items && items.length > 0
                                      ? items.reduce((acc, item) => acc + item.price * item.qty, 0)
                                      : 0) +
                                  (bouquets && bouquets.length > 0
                                      ? bouquets.reduce((acc, item) => acc + item.total_sum, 0)
                                      : 0)
                              ).toFixed(2)
                            : '0.00'}
                    </Typography>
                </Box>
                <Grid sx={{ margin: 1 }}>
                    <Button sx={{ marginRight: 2 }} variant='outlined' color='error' startIcon={<Delete />}>
                        Очистить корзину
                    </Button>
                    <Button onClick={showPayment} color='success' variant='contained'>
                        Оплата
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
