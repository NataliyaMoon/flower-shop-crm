export interface ISuppliers extends ISupplier {
	id: number;
}

export interface ISupplier {
	name_supplier: string;
	email: string;
	phone: string;
	address: string;
	comment: string;
}
