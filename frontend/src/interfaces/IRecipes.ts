export interface IRecipes extends IRecipe {
	id: number;
}

export interface IRecipe {
	id_bouquet: number;
	item_name: string;
	id_item: string;
	qty: string;
}
