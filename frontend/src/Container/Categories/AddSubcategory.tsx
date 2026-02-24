import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddSubcategoryMutation, useGetAllcategoriesQuery, useGetCategoryByIdQuery } from '../../Store/services/categories';
import SuccessPopup from '../../Components/UI/SuccessPopup/SuccessPopup';
import { useNavigate } from 'react-router';
import { Container, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface AddSubcategoryProps {
    id_category: number;
}

const AddSubcategory: React.FC<AddSubcategoryProps> = ({ id_category }) => {
	const [addSubcategory, { error, isError, isSuccess, isLoading }] = useAddSubcategoryMutation();
     
	interface Props {
		subcategory_name: string;
		subcategory_description: string;
        id_category: number;
	}
	const initialFormState: Props = {
		subcategory_name: '',
		subcategory_description: '',
        id_category: id_category,
	};
	const [form, setForm] = useState<Props>(initialFormState);
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setOpen(isError);
		setOpen(isSuccess);
	}, [isError, isSuccess]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await addSubcategory(form);
		if (!(data as unknown as { error: object }).error) {
			navigate('/items_categories');
			setForm(initialFormState);
		}
	};

	return (
		<form onSubmit={submitFormHandler}>
			<Container component="section" maxWidth="xs">
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
				<SuccessPopup open={open} onClose={handleClose} message='Подкатегория создана'/>
				<FormElement
					value={form.subcategory_name}
					label="Название подкатегории"
					name="subcategory_name"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.subcategory_description}
					label="Описание подкатегории"
					name="subcategory_description"
					onChange={inputChangeHandler}
				/>
				<LoadingButton
					loading={isLoading}
					fullWidth
					variant="contained"
					color="success"
					type="submit"
					className="submit"
					sx={{ marginBottom: 2, marginTop: 3 }}
				>
					Добавить подкатегорию
				</LoadingButton>
			</Container>
		</form>
	);
};

export default AddSubcategory;
