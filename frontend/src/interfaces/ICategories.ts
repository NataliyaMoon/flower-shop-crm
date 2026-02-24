export interface ICategories extends ICategory {
	id: number;
	category_name: string;
	category_description: string;
}

export interface ICategory {
	category_name: string;
	category_description: string;
}
