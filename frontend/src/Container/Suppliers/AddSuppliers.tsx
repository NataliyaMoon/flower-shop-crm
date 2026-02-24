import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddSupplierMutation } from '../../Store/services/suppliers';
import SuccessPopup from '../../Components/UI/SuccessPopup/SuccessPopup';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

const AddSupplier = () => {
    const [addSupplier, { error, isError, isSuccess, isLoading }] = useAddSupplierMutation();

    interface Props {
        name_supplier: string;
        email: string;
        phone: string;
        address: string;
        comment: string;
    }

    const initialFormState: Props = {
        name_supplier: '',
        email: '',
        phone: '',
        address: '',
        comment: '',
    };

    const [form, setForm] = useState<Props>(initialFormState);
    const [open, setOpen] = useState(false);

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
        const data = await addSupplier(form);
        if (!(data as unknown as { error: object }).error) {
            setForm(initialFormState);
        }
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Container component='section' maxWidth='xs'>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert severity='error' onClose={handleClose}>
                        {(error as CustomError)?.data?.message}
                    </Alert>
                </Snackbar>
                <SuccessPopup open={open} onClose={handleClose} message='Поставщик создан'/>
                <FormElement
                    value={form.name_supplier}
                    label='Имя поставщика'
                    name='name_supplier'
                    onChange={inputChangeHandler}
                />
                <FormElement value={form.email} label='Email' name='email' onChange={inputChangeHandler} />
                <FormElement value={form.phone} label='Сотовый номер' name='phone' onChange={inputChangeHandler} />
                <FormElement value={form.address} label='Адрес' name='address' onChange={inputChangeHandler} />
                <FormElement value={form.comment} label='Комментарий' name='comment' onChange={inputChangeHandler} />
                <LoadingButton
                    loading={isLoading}
                    fullWidth
                    variant='contained'
                    color='success'
                    type='submit'
                    className='submit'
                    sx={{ marginBottom: 2, marginTop: 3, width: 450 }}
                >
                    Добавить поставщика
                </LoadingButton>
            </Container>
        </form>
    );
};
export default AddSupplier;
