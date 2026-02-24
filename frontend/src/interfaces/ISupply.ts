export interface ISupplies {
	id: number;
	total_count: string;
	name: string;
	source: string;
	target: string;
	item_name: string;
	qty: number;
	price: string;
	total_price: string;
	date: Date;
	update_date: Date | null;
}
export interface ISupply {
	total_count: number;
	name: string;
	source: string;
	target: string;
	item_name: string;
	qty: number;
	price: number;
	total_price: 0;
	date: Date;
	update_date: Date | null;
}
