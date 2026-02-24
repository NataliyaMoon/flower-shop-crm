import { ICategories, ICategory } from '../../interfaces/ICategories';
import { ISubcategories, ISubcategory } from '../../interfaces/ISubcategories';
import { api } from '../../features/index';

const categoryApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllcategories: build.query<ICategories[], void>({
			query: () => '/items_category',
			providesTags: () => [{ type: 'Categories' }],
		}),
		getCategoryById: build.query<ICategories[], number | string>({
			query: (id) => `/items_category/${id}`,
		}),
		getSubcategoriesByIdCategory: build.query<ISubcategories[], number>({
			query: (id) => `/items_subcategory?id_category=${id}`,
			providesTags: () => [{ type: 'Subcategories' }],
		}),
		addCategory: build.mutation<ICategories, ICategory>({
			query: (items_category) => ({
				url: '/items_category',
				method: 'POST',
				body: items_category,
			}),
			invalidatesTags: ['Categories'],
		}),
		deleteCategory: build.mutation<void, number>({
			query: (categoryId) => ({
				url: `/items_category/${categoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Categories'],
		}),
		editCategory: build.mutation<ICategories,
			{ id: number; category: ICategory}>({
			query: (category) => ({
				url: `/items_category/${category.id}`,
				method: 'PUT',
				body: category.category,
			}),
			invalidatesTags: ['Categories'],
		}),
		addSubcategory: build.mutation<ISubcategories, ISubcategory>({
			query: (items_subcategory) => ({
				url: '/items_subcategory',
				method: 'POST',
				body: items_subcategory,
			}),
			invalidatesTags: ['Subcategories'],
		}),
		deleteSubcategory: build.mutation<void, number>({
			query: (subcategoryId) => ({
				url: `/items_subcategory/${subcategoryId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Subcategories'],
		}),
	}),
});

export const {
	useGetAllcategoriesQuery,
	useGetCategoryByIdQuery,
	useGetSubcategoriesByIdCategoryQuery,
	useAddCategoryMutation,
	useDeleteCategoryMutation,
	useEditCategoryMutation,
	useAddSubcategoryMutation,
	useDeleteSubcategoryMutation,
} = categoryApi;
