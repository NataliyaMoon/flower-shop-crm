import { TableRow, TableCell, TextField } from "@mui/material";
import { ItemsOnCart } from "../../FloristUI/FloristMenu/FloristMenu";
import {ChangeEvent} from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
    item: ItemsOnCart;
    removeItem: () => void;
    increaseItem: () => void;
    decreaseItem: () => void;
    changePrice: (e: ChangeEvent<HTMLInputElement>) => void;
    activeItem: () => void;
    editBarDisplay: boolean
}

const CartItem = ({item, removeItem, increaseItem, decreaseItem, changePrice, activeItem, editBarDisplay}: Props) => {
    return (
        <>
        <TableRow onClick={activeItem} sx={{width: '100%', display: 'flex', justifyContent: 'strech'}}>
            <TableCell align='left' sx={{width: '30%'}}>{item.item_name}</TableCell>
            <TableCell align='center' sx={{width: '20%'}}>{item.qty}</TableCell>
            <TableCell align='center' sx={{width: '25%'}}>{item.price}</TableCell>
            <TableCell align='right' sx={{width: '25%'}}>{item.price * item.qty}</TableCell>
        </TableRow>
        {
            editBarDisplay?
            <TableRow sx={{width: '100%', display: 'flex', justifyContent: 'strech'}}>
                <TableCell align='left' sx={{width: '35%', padding: '8px', display: 'flex', alignItems: 'baseline'}}>
                    <TextField
                        sx={{height:30}}
                        id={item.id.toString()}
                        name='price'
                        margin='normal'
                        size='small'
                        value={item.price}
                        type='number'
                        onChange={changePrice} 
                    />
                </TableCell>
                <TableCell align='center' sx={{width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '8px'}}>
                    <RemoveCircleOutlineIcon onClick = {decreaseItem}/>
                    <TextField 
                        sx={{padding: '8px'}}
                        value={item.qty} 
                    />
                    <AddCircleOutlineIcon onClick={increaseItem}/>
                </TableCell >
                <TableCell align='center' onClick={removeItem} sx={{width: '15%', padding: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <HighlightOffIcon />
                </TableCell>
            </TableRow> 
            : 
            null
        }
        </>
    );
};

export default CartItem;