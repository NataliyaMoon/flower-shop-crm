import { api } from '../../features/index';
import {
	IBouquetsImage,
	IBouquetImage,
} from '../../interfaces/IBouquqetImages';

const bouquetsImagesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllImages: build.query<IBouquetsImage[], void>({
			query: () => '/bouquets_images',
			providesTags: () => [{ type: 'BouquetsImage', id: 'List' }],
		}),
		createImage: build.mutation<IBouquetImage, FormData>({
			query: (image) => ({
				url: '/bouquets_images',
				method: 'POST',
				body: image,
			}),
			invalidatesTags: ['BouquetsImage'],
		}),
	}),
});

export const { useGetAllImagesQuery, useCreateImageMutation } =
	bouquetsImagesApi;
