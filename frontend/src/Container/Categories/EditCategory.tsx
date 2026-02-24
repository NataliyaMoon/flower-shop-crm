import { useEditCategoryMutation, useGetCategoryByIdQuery } from '../../Store/services/categories';
import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Props {
	category_name: string;
	category_description: string;
}

const EditCategory = () => {
	const { id } = useParams();
	const { data } = useGetCategoryByIdQuery(id as unknown as number);

	const [editCategory, { error, isError }] = useEditCategoryMutation();

	const [form, setForm] = useState<Props>({
		category_name: '',
		category_description: '',
	});

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		if (data) {
			setForm({
				category_name: data[0]?.category_name || '',
				category_description: data[0]?.category_description || '',
			});
		}
	}, [data]);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await editCategory({ id: Number(id), category: form });
		if (!(data as { error: object }).error) {
			navigate('/items_categories');
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
				<Typography sx={{ color: 'black' }}>
					Редактирование категории{' '}
				</Typography>
				<FormElement
					value={form.category_name}
					label="Название категории"
					name="category_name"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.category_description}
					label="Описание категории"
					name="category_description"
					onChange={inputChangeHandler}
				/>
				<Button
					fullWidth
					variant="contained"
					color="success"
					type="submit"
					className="submit"
					sx={{ marginBottom: 2, marginTop: 3 }}
				>
					Изменить категорию
				</Button>
			</Container>
		</form>
	);
};

export default EditCategory;
