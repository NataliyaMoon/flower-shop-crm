import { api } from '../../features/index';
import { IRecipes, IRecipe } from '../../interfaces/IRecipes';

const recipesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getRecipeById: build.query<IRecipes[], number | string>({
			query: (id) => `/recipes/${id}`,
		}),
		createRecipe: build.mutation<IRecipes, IRecipe>({
			query: (recipe) => ({
				url: '/recipes',
				method: 'POST',
				body: recipe,
			}),
			invalidatesTags: ['Recipes'],
		}),
	}),
});

export const { useGetRecipeByIdQuery, useCreateRecipeMutation } = recipesApi;
