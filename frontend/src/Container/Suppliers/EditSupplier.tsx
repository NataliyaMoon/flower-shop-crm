import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import {
	useEditSupplierMutation,
	useGetSupplierByIdQuery,
} from '../../Store/services/suppliers';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
interface Props {
	name_supplier: string;
	email: string;
	phone: string;
	address: string;
	comment: string;
}

const EditSupplier = () => {
	const { id } = useParams();
	const { data } = useGetSupplierByIdQuery(id as unknown as number);

	const [editSupplier, { error, isError }] = useEditSupplierMutation();

	const [form, setForm] = useState<Props>({
		name_supplier: '',
		email: '',
		phone: '',
		address: '',
		comment: '',
	});

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		if (data) {
			setForm({
				name_supplier: data.name_supplier || '',
				email: data.email || '',
				phone: data.phone || '',
				address: data.address || '',
				comment: data.comment || '',
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
		const data = await editSupplier({ id: Number(id), supplier: form });
		if (!(data as { error: object }).error) {
			navigate('/suppliers');
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
					Редактирование постащика{' '}
				</Typography>
				<FormElement
					value={form.name_supplier}
					label="Имя поставщика"
					name="name_supplier"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.email}
					label="Email"
					name="email"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.phone}
					label="Сотовый номер"
					name="phone"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.address}
					label="Адрес"
					name="address"
					onChange={inputChangeHandler}
				/>
				<FormElement
					value={form.comment}
					label="Комментарий"
					name="comment"
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
					Изменить поставщика
				</Button>
			</Container>
		</form>
	);
};

export default EditSupplier;
