import FileUpload from '../../Components/UI/Form/FileUpload';
import { useSendShowcaseMutation } from '../../Store/services/sendShowcase';
import SuccessPopup from '../../Components/UI/SuccessPopup/SuccessPopup';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Button, Grid, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const SendShowcase = () => {
    const [sendShowcase, {isSuccess, isLoading, isError}] = useSendShowcaseMutation();
    const navigate = useNavigate();
    const [newBouquet, setNewBouquet] = useState({
        name: '',
        description: '',
        image: '',
    });
    const queryParams = new URLSearchParams(window.location.search);
    const params = queryParams.get('params');

    //Тут будет массив который будет получен с предыдущей страницы
    const [bouquetDescription, setBouquetDescription] = useState([
        {
            id: 0,
            item_name: '',
            price: '',
            qty: 0,
        },
    ]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setBouquetDescription(JSON.parse(params as string));
        setOpen(isSuccess);
    }, [params, isSuccess]);

    const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBouquet((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const submitSendHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (newBouquet.image) {
            formData.append('image', newBouquet.image);
        }
        formData.append('description', newBouquet.description);
        formData.append('name', newBouquet.name);
        formData.append('items', JSON.stringify(bouquetDescription));
        await sendShowcase(formData);
        if(!isError) {
         setTimeout(() => {
          navigate('/available_bouquets');
         }, 1500);
        }
    };

    const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        if (e.target.files) {
            const file = e.target.files[0];
            setNewBouquet((prevState) => ({
                ...prevState,
                [name]: file,
            }));
        }
    };

    const cancellation = () => {
        navigate('/florist_page');
    };

    const handleClose = () => {
      setOpen(false);
  };

    return (
        <>
            <Container>
              <SuccessPopup open={open} onClose={handleClose} message='Букет отправлен на витрину'/>
                <Button type='submit' color='secondary' variant='contained' sx={{ mb: 4 }} onClick={cancellation}>
                    Отмена
                </Button>
                <Grid container direction='row' spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant='h4' sx={{ mb: 4 }} textAlign='left'>
                            Описание букета
                        </Typography>
                        <Grid container direction='column' spacing={2}>
                            {bouquetDescription &&
                                bouquetDescription.map((bouquet) => (
                                    <Grid item xs key={bouquet.id}>
                                        <ul>
                                            <li>Цветок: {bouquet.item_name}</li>
                                            <li>Цена: {bouquet.price}</li>
                                            <li>Количество: {bouquet.qty}</li>
                                        </ul>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h4' sx={{ mb: 3 }}>
                            Переместить букет на витрину
                        </Typography>
                        <form autoComplete='off' onSubmit={submitSendHandler}>
                            <Grid container direction='column' spacing={2}>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        label='Название букета'
                                        value={newBouquet.name}
                                        onChange={handleSubmit}
                                        name='name'
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={10}
                                        variant='outlined'
                                        label='Описание букета'
                                        value={newBouquet.description}
                                        onChange={handleSubmit}
                                        name='description'
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FileUpload label='Фото' name='image' onChange={fileChangeHandler} />
                                </Grid>
                                <Grid item xs>
                                    <LoadingButton
                                        loading={isLoading}
                                        type='submit'
                                        color='success'
                                        variant='contained'
                                        disabled={newBouquet.name.length > 0 ? false : true}
                                    >
                                        Переместить
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SendShowcase;
