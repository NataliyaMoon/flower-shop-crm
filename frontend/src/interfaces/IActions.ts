export interface IActions extends IAction {
	id: number;
};

export interface IAction {
	id_bouquet: number;
	item_name: string;
	qty: number;
    price: number
};
export interface IDetailBoquet extends IAction {
	invoice_number: string;
	username:string;
	date:string;
	bouquet_name:string;
	image_bouquet:string;
};
