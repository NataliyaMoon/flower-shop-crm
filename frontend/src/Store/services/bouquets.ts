import { api } from '../../features/index';
import { IBouquets, IBouquet } from '../../interfaces/IBouquets';

const bouquetsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllBouquets: build.query<IBouquets[], void>({
			query: () => '/bouquets',
			providesTags: () => [{ type: 'Bouquets', id: 'LIST' }],
		}),
		createBouquet: build.mutation<IBouquets[], IBouquet>({
			query: (bouquet) => ({
				url: '/bouquets',
				method: 'POST',
				body: bouquet,
			}),
			invalidatesTags: ['Bouquets'],
		}),
		getBouquetById: build.query<IBouquet[], number>({
			query: (id) => `/bouquets/${id}`,
		}),
	}),
});

export const {
	useGetAllBouquetsQuery,
	useCreateBouquetMutation,
	useGetBouquetByIdQuery,
} = bouquetsApi;
