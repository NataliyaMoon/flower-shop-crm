import { ISources } from '../../interfaces/ISources';
import { api } from '../../features/index';

const sourceApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllSources: build.query<ISources[], void>({
			query: () => '/suppliers_controllers',
			providesTags: () => [{ type: 'Sources' }],
		}),
	}),
});

export const { useGetAllSourcesQuery } = sourceApi;
