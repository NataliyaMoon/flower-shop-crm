import { TableRow, TableCell, TextField, Avatar } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import {ChangeEvent} from 'react';

interface Props {
    id: number;
    image: string;
    name: string;
    price: number;
    total_sum: number;
    actualPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CartBouquet = ({id, image, name, price, actualPriceChange, total_sum}: Props) => {
    return (
        <TableRow  sx={{width: '100%', display: 'flex', justifyContent: 'strech', backgroundColor: 'aliceblue', borderRadius: '10px'}}>
            <TableCell align='left' sx={{width: '15%'}}>
                <Avatar>
                    {image? <img src={image} alt={name} style={{width: 'inherit', height: 'inherit'}}/> : <ImageIcon />}
                </Avatar>
            </TableCell>
            <TableCell align='center' sx={{width: '35%', display: 'flex', alignItems: 'center'}}>{name}</TableCell>
            <TableCell align='center' sx={{width: '23%', display: 'flex', alignItems: 'center'}}>{price}</TableCell>
            <TableCell align='right' sx={{width: '27%', padding: '0px, 5px', display: 'flex', alignItems: 'baseline'}}>
                <TextField
                    sx={{height:30}}
                    id={id.toString()}
                    name='price'
                    margin='normal'
                    size='small'
                    value={total_sum.toFixed()}
                    type='number'
                    onChange={actualPriceChange} 
                />
            </TableCell>
        </TableRow>
    );
};

export default CartBouquet;