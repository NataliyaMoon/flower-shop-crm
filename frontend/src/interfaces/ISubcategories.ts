export interface ISubcategories extends ISubcategory {
	id: number;
	subcategory_name: string;
	subcategory_description: string;
	id_category: number;
}
export interface ISubcategory {
	subcategory_name: string;
	subcategory_description: string;
	id_category: number;
}
