export interface ItemsPrice {
    item_id: number;
    price: number;
};

export  interface ItemsPrices extends ItemsPrice {
    id: number
    added_date: Date
};