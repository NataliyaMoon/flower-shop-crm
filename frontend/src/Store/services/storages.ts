import { IStorages } from '../../interfaces/IStorages';
import { api } from '../../features/index';

const storagesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllStorage: build.query<IStorages[], void>({
			query: () => '/storages',
			providesTags: () => [{ type: 'Storages' }],
		}),
	}),
});

export const { useGetAllStorageQuery } = storagesApi;
