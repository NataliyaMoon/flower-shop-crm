import { UserForm } from '../../interfaces/RegisterForm';
import { useSignUpMutation } from '../../Store/services/auth';
import { CustomError } from '../../interfaces/errors/CustomError';
import FormElement from '../../Components/UI/Form/FormElement';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import {
	Container,
	Avatar,
	Typography,
	Grid,
	Button,
	Link,
	Box,
	Snackbar,
	Alert,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';

const Register = () => {
	const [form, setForm] = useState<UserForm>({
		username: '',
		password: '',
		email: '',
		phone: '',
		first_name: '',
		last_name: '',
		address: '',
	});

	const [signUp, { isError, error }] = useSignUpMutation();

	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setOpen(isError);
	}, [isError]);

	const handleClose = () => {
		setOpen(false);
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await signUp(form);

		if (!(data as { error: object }).error) {
			setForm({
				username: '',
				password: '',
				email: '',
				phone: '',
				first_name: '',
				last_name: '',
				address: '',
			});
			navigate('/login');
		}
	};

	return (
		<Container component="section" maxWidth="xs">
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
			<Box>
				<Avatar sx={{ marginTop: 3, marginBottom: 2, marginLeft: 22 }}>
					<LockOutlined />
				</Avatar>
				<Typography
					component="h1"
					variant="h5"
					sx={{ marginTop: 3, marginBottom: 2, marginLeft: 10 }}
				>
					Зарегистрироваться
				</Typography>
				<Box>
					<form onSubmit={submitFormHandler}>
						<Grid container spacing={2}>
							<FormElement
								required
								value={form.username}
								onChange={inputChangeHandler}
								name="username"
								label="Логин"
							/>
							<FormElement
								required
								value={form.first_name}
								onChange={inputChangeHandler}
								name="first_name"
								label="Имя пользователя"
							/>
							<FormElement
								required
								value={form.last_name}
								onChange={inputChangeHandler}
								name="last_name"
								label="Фамилия пользователя"
							/>
							<FormElement
								required
								value={form.phone}
								onChange={inputChangeHandler}
								name="phone"
								label="Телефон"
							/>
							<FormElement
								required
								value={form.email}
								onChange={inputChangeHandler}
								type="email"
								name="email"
								label="Электронная почта"
							/>
							<FormElement
								required
								value={form.address}
								onChange={inputChangeHandler}
								name="address"
								label="Адрес"
							/>
							<FormElement
								required
								value={form.password}
								onChange={inputChangeHandler}
								type="password"
								name="password"
								label="Пароль"
							/>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							sx={{ marginTop: 3, marginBottom: 2 }}
						>
							Зарегистрироваться
						</Button>
						<Grid container>
							<Grid item sx={{ marginLeft: 10 }}>
								<Link component={RouterLink} to="/login">
									У вас уже есть аккаунт? Войти.
								</Link>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Box>
		</Container>
	);
};

export default Register;
