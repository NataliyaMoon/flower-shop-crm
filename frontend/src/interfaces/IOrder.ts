export interface IOrders {
	id: number;
	order_number: string;
	order_date: string;
	total_sales: number;
	first_name: string;
}

export interface IOrder {
	order_number: string;
	bouquet_id: number;
	actual_price: number;
	total_sum: number;
	payment_type: string;
	added_date: string;
	update_date: string;
	general_order_id: number;
	user_id: number;
	last_name: string;
	first_name: string;
	bouquet_name: string;
}
