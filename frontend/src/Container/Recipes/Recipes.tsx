import AddButton from '../../Components/UI/Button/AddButton';
import FormElement from '../../Components/UI/Form/FormElement';
import { useGetAllBouquetsQuery, useCreateBouquetMutation } from '../../Store/services/bouquets';
import { useGetRecipeByIdQuery } from '../../Store/services/recipes';
import RecipesComponent from '../../Components/Recipes/Recipes';
import { useGetAllImagesQuery } from '../../Store/services/bouquetsImages';
import { useAppSelector } from '../../Store/hooks';
import { GlobalTheme } from '../..';
import { useCreateAvailableBouquetMutation } from '../../Store/services/availableBouquets';
import SuccessPopup from '../../Components/UI/SuccessPopup/SuccessPopup';
import Loading from '../../Components/UI/Loading/Loading';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    ImageList,
    ThemeProvider,
} from '@mui/material';

const Recipes = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);

    const [selectedBouquetId, setSelectedBouquetId] = useState<number>(0);
    const { data: bouquets, isLoading } = useGetAllBouquetsQuery();
    const { data: recipes } = useGetRecipeByIdQuery(selectedBouquetId);
    const { data: images } = useGetAllImagesQuery();
    const [createBouquet] = useCreateBouquetMutation();
    const [showForm, setShowForm] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);
    const [selectedBouquetIds, setSelectedBouquetIds] = useState<number[]>([]);
    const [sendToShowcase, { isSuccess }] = useCreateAvailableBouquetMutation();

    interface Props {
        bouquet_name: string;
        bouquet_description: string;
        author: string;
        id_category: string;
        image: string;
        sum: string;
    }
    const [form, setForm] = useState<Props>({
        bouquet_name: '',
        bouquet_description: '',
        author: user.first_name as string,
        id_category: '4',
        image: '',
        sum: '',
    });

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await createBouquet(form);
        if (!('error' in data)) {
            const bouquetId = data.data[0].id;
            navigate(`/new-recipes/${bouquetId}`);
        }
    };

    const checkHandler = (id: number) => {
        if (selectedBouquetIds.includes(id)) {
            setSelectedBouquetIds(selectedBouquetIds.filter((bouquetId) => bouquetId !== id));
        } else {
            setSelectedBouquetIds([...selectedBouquetIds, id]);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleBouquetClick = (id: number) => {
        setSelectedBouquetId(id);
        setOpen(true);
    };
    const bouquetsWithImages = bouquets?.map((bouquet) => ({
        ...bouquet,
        image: images?.find((image) => image.id_bouquet === bouquet.id),
    }));

    useEffect(() => {
        setShow(isSuccess);
    }, [isSuccess]);

    const handleSendToShowcase = async () => {
        await sendToShowcase({
            bouquets: selectedBouquetIds,
        });
        setIsChecked(false);
        setShow(true);
    };

    const handleCloseShow = () => {
        setShow(false);
    };

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {isLoading && <Loading/>}
                <SuccessPopup open={show} onClose={handleCloseShow} message="Букеты отправлены на витрину" />
                <AddButton onClick={handleAddButtonClick} buttonText="Создать новый рецепт" />
                <form onSubmit={submitFormHandler}>
                    {showForm && (
                        <Grid sx={{
                            display:'flex',
                            flexDirection:'column',
                            margin: 'auto',
                            width: '40%',
                        }}>
                            <FormElement
                                value={form.bouquet_name}
                                label="Название"
                                name="bouquet_name"
                                onChange={inputChangeHandler}
                            />
                            <FormElement
                                value={form.bouquet_description}
                                label="Описание"
                                name="bouquet_description"
                                onChange={inputChangeHandler}
                            />
                            <Button type="submit" variant="contained" color="success">
                                Создать
                            </Button>
                            <Button variant="contained" color="error" onClick={handleAddButtonClick}>
                                Отмена
                            </Button>
                        </Grid>
                    )}
                </form>
                {selectedBouquetIds.length  >=1 && isChecked ? (
                    <Button variant="contained" color="secondary" onClick={handleSendToShowcase}>
                        Отправить букет на витрину
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => setIsChecked(true)}>
                        Выбрать Рецепт
                    </Button>
                )}

                <Grid container>
                    <ImageList  
                        cols={4}
                        sx={{ width: '100%', display:'grid'}}
                     >
                        <>
                        {bouquetsWithImages &&
                            bouquetsWithImages.map((bouquet) => (
                                <RecipesComponent
                                    key={bouquet.id}
                                    onClick={() => handleBouquetClick(bouquet.id)}
                                    id={bouquet.id}
                                    bouquet_name={bouquet.bouquet_name}
                                    bouquet_description={bouquet.bouquet_description}
                                    author={bouquet.author}
                                    id_category={bouquet.id}
                                    image={bouquet.image?.image as string}
                                    sum={bouquet.sum}
                                    checkboxVisible={isChecked}
                                    selected={selectedBouquetId === bouquet.id}
                                    checkHandler={() => checkHandler(bouquet.id)}
                                />
                            ))}
                        </>
                    </ImageList>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle color="black">Состав</DialogTitle>
                    <DialogContent>
                        {recipes &&
                            recipes.map((item) => (
                                <DialogContentText>
                                    {item.item_name} : {item.qty} штук(а)
                                </DialogContentText>
                            ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Закрыть</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default Recipes;
