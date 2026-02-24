import { apiUrl } from '../../common/constans';
import {
    Card,
    CardContent,
    CardActions,
    IconButton,
    TextField,
    Grid,
    Typography,
    Button,
    CardHeader,
    CardMedia,
} from '@mui/material';
import { Delete, ModeEdit, Done, Clear } from '@mui/icons-material';
import { MouseEventHandler, ChangeEventHandler } from 'react';

interface Props {
    id: number;
    item_name: string;
    price: number;
    isEditing: boolean;
    editingPrice: number;
    onClick: MouseEventHandler<HTMLButtonElement>;
    onDelete: MouseEventHandler<HTMLButtonElement>;
    changePrice: MouseEventHandler<HTMLButtonElement>;
    handleSaveClick: (itemId: number, newPrice: number) => void;
    handleCancelClick: MouseEventHandler<HTMLButtonElement>;
    handlePriceChange: ChangeEventHandler<HTMLInputElement>;
    image_small: string;
}

const ItemsList = ({
    id,
    item_name,
    price,
    isEditing,
    onClick,
    onDelete,
    editingPrice,
    changePrice,
    handleSaveClick,
    handleCancelClick,
    handlePriceChange,
    image_small,
}: Props) => {
    const handleSaveButtonClick = () => {
        handleSaveClick(id, editingPrice);
    };

    let cardImage;
    if (image_small) {
        cardImage = `${image_small}`;
    }

    return (
        <Card sx={{ width: 250, height: 350 }}>
            <CardContent style={{ position: 'relative' }}>
                <CardHeader
                    action={
                        <>
                            <IconButton onClick={onClick} style={{ position: 'absolute', right: '0', top: '0' }}>
                                <ModeEdit />
                            </IconButton>
                            <IconButton
                                onClick={onDelete}
                                style={{ position: 'absolute', right: '35px', top: '0', color: 'red' }}
                            >
                                <Delete />
                            </IconButton>
                        </>
                    }
                />
                <CardMedia
                    sx={{ height: 140 }}
                    image={cardImage}
                    title={cardImage}
                />

                <Typography variant="body1" style={{ maxWidth: '100%' }}>
                    {item_name}
                </Typography>
                {isEditing ? (
                    <Grid container alignItems="center">
                        <TextField
                            value={editingPrice}
                            onChange={handlePriceChange}
                            id="outlined-basic"
                            label="Цена"
                            variant="outlined"
                            type="number"
                        />
                        <IconButton onClick={handleSaveButtonClick}>
                            <Done />
                        </IconButton>
                        <IconButton onClick={handleCancelClick}>
                            <Clear />
                        </IconButton>
                    </Grid>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        Цена: {price}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                {!isEditing && (
                    <Button onClick={changePrice} size="small">
                        Изменить Цену
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default ItemsList;