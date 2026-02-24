import { api } from '../../features/index';
import ISendData from '../../interfaces/ISale';

const sendShowcaseApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendForSale: build.mutation<void, ISendData>({
      query: (bouquets) => ({
        url: '/sales',
        method: 'POST',
        body: bouquets,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSendForSaleMutation } = sendShowcaseApi;