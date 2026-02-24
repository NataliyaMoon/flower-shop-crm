export interface IBouquet {
	bouquet_name: string;
	bouquet_description: string;
	author: string;
	id_category: number | string;
	image: string;
	sum: string;
}

export interface IBouquets extends IBouquet {
	id: number;
}
