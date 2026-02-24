/* eslint-disable @typescript-eslint/await-thenable */
import AddItem from './AddItems';
import { useGetAllItemsQuery, useDeleteItemMutation } from '../../Store/services/items';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import ItemsList from '../../Components/Items/ItemsList';
import { GlobalTheme } from '../..';
import AddButton from '../../Components/UI/Button/AddButton';
import { useCreateItemsPriceMutation } from '../../Store/services/itemsPrices';
import { Items } from '../../interfaces/Items';
import Loading from '../../Components/UI/Loading/Loading';
import { useEffect, useState } from 'react';
import { Alert, Container, Grid, Snackbar, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SuccessPopup from '../../Components/UI/SuccessPopup/SuccessPopup';

const ItemsContainer = () => {
    const { data, isLoading, isError, error } = useGetAllItemsQuery();
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [deleteItem, {isSuccess}] = useDeleteItemMutation();
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [uncoverForm, setUncoverForm] = useState(false);
    const [createPrice] = useCreateItemsPriceMutation();
    const navigate = useNavigate();

    useEffect(() => {
        setOpen(isError);
    }, [isError]);
    const [items, setItems] = useState<Items[]>([]);

    useEffect(() => {
        if (data) {
            setItems(data as []);
        }
        setShow(isSuccess);
    }, [data, isSuccess]);

    const handleClose = () => {
        setOpen(false);
        setOpenModal(false);
        setShow(false);
    };

    const handleAddButtonClick = () => {
        setUncoverForm(!uncoverForm);
    };

    const handleDeleteItem = (itemId: number) => {
        setDeleteItemId(itemId);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId) {
            try {
                const result = await deleteItem(deleteItemId);
                if ('error' in result && result.error) {
                    setOpenModal(true);
                    setOpen(true);
                } else {
                    setOpenModal(false);
                }
            } catch (error) {
                setOpenModal(true);
                setOpen(true);
            }
            setDeleteItemId(null);
        }
    };
    const [editingPriceId, setEditingPriceId] = useState<number | null>(null);

    const handleEditPrice = (itemId: number, price: number) => {
        setEditingPrice(price);
        setEditingPriceId(itemId);
    };

    const handleSaveClick = async (itemId: number, newPrice: number) => {
        await createPrice({
            item_id: itemId,
            price: newPrice,
        });
        const updatedItems = items.map((item) => {
            if (item.id === itemId) {
                return { ...item, price: newPrice };
            }
            return item;
        });

        setItems(updatedItems);
        setEditingPriceId(null);
    };
    const [editingPrice, setEditingPrice] = useState(0);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditingPrice(Number(event.target.value));
    };
    
    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <SuccessPopup open={show} onClose={handleClose} message="Товар удален"/>
                {isLoading && <Loading/>}
                <AddButton buttonText="Создать Товар" onClick={handleAddButtonClick} />
                {uncoverForm && <AddItem />}
                <Grid container>
                    {items &&
                        items.map((item) => {
                            return (
                                <Grid item key={item.id}>
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        open={open}
                                        autoHideDuration={3000}
                                        onClose={handleClose}
                                    >
                                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                            {(error as CustomError)?.data?.message}
                                        </Alert>
                                    </Snackbar>
                                    <Modal
                                        isOpen={openModal && deleteItemId === item.id}
                                        onClose={handleClose}
                                        title="Вы действительно хотите удалить этот товар?"
                                        isLoading={isLoading}
                                        actionButtonLabel="Удалить"
                                        onActionButtonClick={handleConfirmDelete}
                                    />
                                    <Grid container sx={{ margin: 1 }}>
                                        <ItemsList
                                          id={item.id}
                                          item_name={item.item_name}
                                          price={editingPriceId === item.id ? editingPrice : item.price}
                                          onClick={() => navigate(`/edit-item/${item.id}`)}
                                          onDelete={() => handleDeleteItem(item.id)}
                                          changePrice={() => handleEditPrice(item.id, item.price)}
                                          handleCancelClick={() => setEditingPriceId(null)}
                                          isEditing={editingPriceId === item.id}
                                          handleSaveClick={() => handleSaveClick(item.id, editingPrice)}
                                          editingPrice={editingPrice}
                                          handlePriceChange={handlePriceChange} 
                                          image_small={item.image_small}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ItemsContainer;
