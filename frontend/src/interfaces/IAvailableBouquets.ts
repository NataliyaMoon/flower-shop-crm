export interface IAvailableBouquet {
	id: number;
	order_number:string;
	name_bouquet: string;
	actual_price: number;
	image_bouquet: string;
	added_date: string;
	total_sum: number;
	username:string
};

export interface IAvailableBouquets extends IAvailableBouquet {
	id: number;
};
export interface ISendToShowCase {
	bouquets: number[]
}