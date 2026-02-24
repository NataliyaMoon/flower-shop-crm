export interface Items extends Item {
	id: number;
	create_date: Date;
	available_qty: number;
}

export interface Item {
	item_name: string;
	item_description: string;
	price: number;
	id_category: string;
	id_subcategory: string;
	image_small: string;
	id_user: number;
}
