import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useEditItemMutation, useGetItemByIdQuery } from '../../Store/services/items';
import { useGetAllcategoriesQuery, useGetSubcategoriesByIdCategoryQuery } from '../../Store/services/categories';
import BasicSelect from '../../Components/UI/Form/SelectFormElement';
import { useAppSelector } from '../../Store/hooks';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface ItemProps {
  item_name: string;
  item_description: string;
  id_category: string;
  id_subcategory: string;
  id_user: number | string;
}

const EditItem = () => {
  const { id } = useParams();
  const { data: itemById, refetch } = useGetItemByIdQuery(id as string, {
    refetchOnMountOrArgChange: false,
  });

  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const { data: categories } = useGetAllcategoriesQuery();
  const { data: subcategory } = useGetSubcategoriesByIdCategoryQuery(categoryId);
  console.log(subcategory);
  
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const handleClick = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId);
    setCategoryId(itemId);
  };
  const handleClickSubcategory = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId);
    setSubCategoryId(itemId);
  };
  const { user } = useAppSelector((state) => state.auth);

  const [editItem, { error }] = useEditItemMutation();

  const [form, setForm] = useState<ItemProps>({
    item_name: '',
    item_description: '',
    id_category: '',
    id_subcategory: '',
    id_user: '',
  });

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await itemById;
      if (itemById) {
        setForm((prevState) => ({
          ...prevState,
          item_name: itemById[0].item_name,
          item_description: itemById[0].item_description,
          id_category: itemById[0].id_category,
          id_subcategory: itemById[0].id_subcategory,
          id_user: user.id,
        }));
      }
    };

    fetchData();
  }, [itemById, user]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name as keyof ItemProps]: value,
    }));
  };

  const selectChangeHandler = (name: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [name as keyof ItemProps]: value,
    }));
  };

  const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (itemById && form.item_name) {
      const data = await editItem({ itemId: id as string, item: form });

      if (!(data as { error: object }).error) {
        await refetch();
        navigate('/');
      }
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Container component="section" maxWidth="xs" sx={{ marginTop: '100px' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="error" onClose={handleClose}>
            {(error as CustomError)?.data?.message}
          </Alert>
        </Snackbar>
        <FormElement value={form.item_name} label="Title" name="item_name" onChange={inputChangeHandler} />
        <FormElement
          value={form.item_description}
          label="Описание"
          name="item_description"
          onChange={inputChangeHandler}
        />
        <BasicSelect
          value={form.id_category}
          label="Категория"
          name="id_category"
          onChange={(value) => {
            const categoryId = parseInt(value);
            selectChangeHandler('id_category', value);
            handleClick(categoryId);
          }}
          options={
            categories
              ? categories.map((category) => ({
                  id: category.id,
                  name: category.category_name,
                }))
              : []
          }
        />
        <BasicSelect
          value={form.id_subcategory}
          label="Подкатегория"
          name="id_subcategory"
          onChange={(value) => {
            const subCategoryId = parseInt(value);
            selectChangeHandler('id_subcategory', value);
            handleClickSubcategory(subCategoryId);
          }}
          options={
            subcategory
              ? subcategory.map((subcategory) => ({
                  id: subcategory.id,
                  name: subcategory.subcategory_name,
                }))
              : []
          }
        />
        <Button fullWidth variant="contained" color="success" type="submit" className="submit">
          Изменить
        </Button>
      </Container>
    </form>
  );
};

export default EditItem;
