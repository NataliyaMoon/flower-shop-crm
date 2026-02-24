import { api } from '../../features/index';
import { ICities, ICity } from '../../interfaces/ICities';

const citiesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllCities: build.query<ICities[], void>({
			query: () => '/cities',
			providesTags: () => [{ type: 'Cities', id: 'LIST' }],
		}),
		getCityById: build.query<ICities, number>({
			query: (id) => `/cities/${id}`,
		}),
		addCity: build.mutation<ICities, ICity>({
			query: (city) => ({
				url: '/cities',
				method: 'POST',
				body: city,
			}),
			invalidatesTags: ['Cities'],
		}),
	}),
});

export const { useGetAllCitiesQuery, useAddCityMutation, useGetCityByIdQuery } =
	citiesApi;
