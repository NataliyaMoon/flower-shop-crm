import noImage from '../../../assets/no-photo.png';
import { deepOrange } from '@mui/material/colors';
import { Avatar, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {
    id: number;
    item_name: string;
    price: number;
    image_small: string;
    available_qty: number;
    onClickCard: () => void;
}

const Items = ({ id, item_name, price, image_small, onClickCard, available_qty }: Props) => {
    let cardImage = noImage;
    if (image_small) {
        cardImage = `${image_small}`;
    }
    return (
        <Card key={id} sx={{ width: 240, height: 240, margin: 1 }} onClick={onClickCard}>
            <CardContent style={{ position: 'relative' }}>
                <Avatar sx={{ bgcolor: deepOrange[500], position: 'absolute', top: 1, right: 1 }}>
                    {available_qty}
                </Avatar>
                <CardMedia sx={{ height: 150 }} image={cardImage} title={cardImage} />

                <Typography variant="body1" style={{ maxWidth: '100%' }}>
                    {item_name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Цена: {price}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Items;
