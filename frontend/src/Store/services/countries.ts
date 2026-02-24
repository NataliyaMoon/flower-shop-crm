import { api } from '../../features/index';
import { ICountries, ICountry } from '../../interfaces/ICountries';

const countriesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllCountries: build.query<ICountries[], void>({
			query: () => '/countries',
			providesTags: () => [{ type: 'Countries', id: 'LIST' }],
		}),
		getCountryById: build.query<ICountries, number>({
			query: (id) => `/countries/${id}`,
		}),
		addCountry: build.mutation<ICountries, ICountry>({
			query: (country) => ({
				url: '/countries',
				method: 'POST',
				body: country,
			}),
			invalidatesTags: ['Countries'],
		}),
	}),
});

export const {
	useGetAllCountriesQuery,
	useAddCountryMutation,
	useGetCountryByIdQuery,
} = countriesApi;
