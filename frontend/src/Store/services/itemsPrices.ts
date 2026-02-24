import { api } from '../../features/index';
import { ItemsPrice, ItemsPrices } from '../../interfaces/ItemsPrices';

const itemsPricesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllItemsPrices: build.query<ItemsPrices[], void>({
			query: () => '/items_prices',
			providesTags: () => [{ type: 'ItemsPrices', id: 'LIST' }],
		}),
        createItemsPrice: build.mutation<ItemsPrices, ItemsPrice>({
            query: (itemsPrice) => ({
				url: '/items_prices',
				method: 'POST',
				body: itemsPrice,
			}),
			invalidatesTags: ['ItemsPrices'],
    }),
    }),
});

export const {useCreateItemsPriceMutation, useGetAllItemsPricesQuery} = itemsPricesApi;