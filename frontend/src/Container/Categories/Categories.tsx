import AddCategory from './AddCategory';
import {
    useDeleteCategoryMutation,
    useDeleteSubcategoryMutation,
    useGetAllcategoriesQuery,
    useGetSubcategoriesByIdCategoryQuery,
} from '../../Store/services/categories';
import { ICategories } from '../../interfaces/ICategories';
import Modal from '../../Components/UI/Modal/Modal';
import { CustomError } from '../../interfaces/errors/CustomError';
import Loading from '../../Components/UI/Loading/Loading';
import { GlobalTheme } from '../..';
import { ISubcategories, ISubcategory } from '../../interfaces/ISubcategories';
import { useEffect, useState } from 'react';
import {
    Container,
    List,
    ListItemButton,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Grid,
    Snackbar,
    Alert,
    ThemeProvider,
} from '@mui/material';

import { Send as SendIcon, ExpandLess, ExpandMore, AddCircleOutline } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone';
import StarsTwoToneIcon from '@mui/icons-material/StarsTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
import { useNavigate } from 'react-router';
import AddSubcategory from './AddSubcategory';

const Categories = () => {
    const { data, isLoading, isError, error } = useGetAllcategoriesQuery();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteCategory] = useDeleteCategoryMutation();
    const [deleteSubcategory] = useDeleteSubcategoryMutation();
    const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
    const [deleteSubcategoryId, setDeleteSubcategoryId] = useState<number | null>(null);
    const [openItemId, setOpenItemId] = useState<number | null>(null);
    const [uncoverForm, setUncoverForm] = useState(false);
    const [uncoverSubcategoryForm, setUncoverSubcategoryForm] = useState(false);
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState(0);
    const { data: subcategories, isFetching } = useGetSubcategoriesByIdCategoryQuery(categoryId);

    useEffect(() => {
        setOpen(isError);
    }, [isError]);

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    const handleClick = (itemId: number) => {
        setOpenItemId(itemId === openItemId ? null : itemId);
        setCategoryId(itemId);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setOpenModal(false);
    };

    const handleAddButtonClick = () => {
        setUncoverForm(!uncoverForm);
    };

    const handleDeleteCategory = async (categoryId: number) => {
        setDeleteCategoryId(categoryId);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteCategoryId) {
            try {
                const result = await deleteCategory(deleteCategoryId);
                if ('error' in result && result.error) {
                    setOpenModal(true);
                    setOpen(true);
                } else {
                    setOpenModal(false);
                }
                setDeleteCategoryId(null);
            } catch (error) {
                setOpenModal(true);
                setOpen(true);
            }
        }
    };

    const handleDeleteSubcategory = async (subcategoryId: number) => {
        setDeleteSubcategoryId(subcategoryId);
        setOpenModal(true);
    };

    const handleConfirmDeleteSubcategory = async () => {
        if (deleteSubcategoryId) {
            try {
                const result = await deleteSubcategory(deleteSubcategoryId);
                if ('error' in result && result.error) {
                    setOpenModal(true);
                    setOpen(true);
                } else {
                    setOpenModal(false);
                }
                setDeleteSubcategoryId(null);
            } catch (error) {
                setOpenModal(true);
                setOpen(true);
            }
        }
    };

    const handleAddSubcategory = () => {
        setUncoverSubcategoryForm(!uncoverSubcategoryForm);
    };


    if (isLoading) return <Loading />;
    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container maxWidth={'xl'} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <List
                    sx={{
                        background: 'linear-gradient(10deg,	#FFF8DC 10%,#d6d3ea 90%)',
                        borderRadius: 2,
                        color: 'black',
                        width: 600,
                    }}
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    subheader={
                        <ListSubheader component='div' id='nested-list-subheader' sx={{ textAlign: 'center' }}>
                            <Typography variant='h2'>Список категорий</Typography>
                        </ListSubheader>
                    }
                >
                    <ListItem>
                        <ListItemButton onClick={handleAddButtonClick}>
                            <ListItemIcon>
                                <QueueTwoToneIcon sx={{ width: 35, height: 35 }} />
                            </ListItemIcon>
                            <Typography variant='h5'>Категория</Typography>
                        </ListItemButton>
                    </ListItem>
                    {uncoverForm && <AddCategory />}
                    {data &&
                        data.map((category: ICategories) => {
                            const isItemOpen = category.id === openItemId;
                            return (
                                <Grid key={category.id}>
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                        open={open}
                                        autoHideDuration={3000}
                                        onClose={handleCloseSnackbar}
                                    >
                                        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
                                            {(error as CustomError)?.data?.message}
                                        </Alert>
                                    </Snackbar>
                                    <Modal
                                        isOpen={openModal && deleteCategoryId === category.id}
                                        onClose={handleCloseModal}
                                        title='Вы действительно хотите удалить эту категорию?'
                                        isLoading={isLoading}
                                        actionButtonLabel='Удалить'
                                        onActionButtonClick={handleConfirmDelete}
                                        children={undefined}
                                    />
                                    <ListItemButton onClick={() => handleClick(category.id)} key={category.id}>
                                        <ListItemIcon>
                                            <StarsTwoToneIcon sx={{ width: 30, height: 30 }} />
                                        </ListItemIcon>
                                        <ListItemText primary={category.category_name} />
                                        <ListItemButton onClick={handleAddSubcategory}>
                                            <ListItemIcon>
                                                <AddCircleOutline />
                                            </ListItemIcon>
                                        </ListItemButton>
                                        <IconButton
                                            onClick={() => navigate(`/edit-category/${category.id}`)}
                                            aria-label='settings'
                                        >
                                            <ModeEditTwoToneIcon sx={{ width: 35, height: 35 }} />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => handleDeleteCategory(category.id)}
                                            aria-label='settings'
                                        >
                                            <DeleteForeverTwoToneIcon sx={{ width: 30, height: 30 }} />
                                        </IconButton>
                                        {isItemOpen ? (
                                            <ExpandLess
                                                onClick={() => {
                                                    setCategoryId(0);
                                                }}
                                            />
                                        ) : (
                                            <ExpandMore
                                                onClick={() => {
                                                    setCategoryId(category.id);
                                                }}
                                            />
                                        )}
                                    </ListItemButton>
                                    <Collapse
                                        in={isItemOpen}
                                        timeout='auto'
                                        unmountOnExit
                                        sx={{ flexDirection: 'column' }}
                                    >
                                        <List component='div' disablePadding sx={{ flexDirection: 'column' }}>
                                            <>
                                                {uncoverSubcategoryForm && category.id === categoryId && <AddSubcategory id_category={category.id} />}
                                                {isFetching ? (
                                                    <ListItemText sx={{ pl: 9 }}>Loading...</ListItemText>
                                                ) : subcategories?.length === 0 ? (
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <ListItemIcon>
                                                            <SendIcon sx={{ width: 30, height: 30 }} />
                                                        </ListItemIcon>
                                                        <ListItemText>Нет подкатегорий</ListItemText>
                                                    </ListItemButton>
                                                ) : (
                                                    subcategories?.map((sub: ISubcategories) => {
                                                        return (
                                                            <ListItemButton key={sub.id} sx={{ pl: 4 }}>
                                                                <Modal
                                                                    isOpen={openModal && deleteSubcategoryId === sub.id}
                                                                    onClose={handleCloseModal}
                                                                    title='Вы действительно хотите удалить эту подкатегорию?'
                                                                    isLoading={isLoading}
                                                                    actionButtonLabel='Удалить'
                                                                    onActionButtonClick={handleConfirmDeleteSubcategory}
                                                                    children={undefined}
                                                                />
                                                                <ListItemIcon>
                                                                    <CheckBoxTwoToneIcon
                                                                        sx={{ width: 30, height: 30 }}
                                                                    />
                                                                </ListItemIcon>
                                                                <ListItemText key={sub.id}>
                                                                    {sub.subcategory_name}
                                                                </ListItemText>
                                                                <IconButton
                                                                    onClick={() => handleDeleteSubcategory(sub.id)}
                                                                    aria-label='settings'
                                                                >
                                                                    <DeleteForeverTwoToneIcon sx={{ width: 30, height: 30 }} />
                                                                </IconButton>
                                                            </ListItemButton>
                                                        );
                                                    })
                                                )}
                                            </>
                                        </List>
                                    </Collapse>

                                </Grid>
                            );
                        })}
                </List>
            </Container>
        </ThemeProvider>
    );
};
export default Categories;
