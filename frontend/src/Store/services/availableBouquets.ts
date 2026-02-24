import { api } from "../../features/index";
import { IDetailBoquet } from "../../interfaces/IActions";
import {
  IAvailableBouquet,
  IAvailableBouquets,
  ISendToShowCase
} from "../../interfaces/IAvailableBouquets";

const availableBouquetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllAvailableBouquets: build.query<IAvailableBouquets[], void>({
      query: () => "/sales/showcase",
      providesTags: () => [{ type: "AvailableBouquets", id: "LIST" }]
    }),
    getBouquetsOnBasket: build.query<IAvailableBouquets[], void>({
      query: () => '/sales/basket'
    }),
    getAvailableBouquetById: build.query<IDetailBoquet[], number | string>({
      query: (id) => `/sales/showcase/${id}`
    }),
    editAvailableBouquet: build.mutation<
      IAvailableBouquet,
      { id: number; bouquet: Partial<IAvailableBouquet> }
    >({
      query: ({ id, bouquet }) => ({
        url: `/sales/${id}`,
        method: "PUT",
        body: {
          total_sum: bouquet.total_sum
          // count: bouquet.count,
        }
      }),
      invalidatesTags: ["AvailableBouquets"]
    }),
    createAvailableBouquet: build.mutation<
      IAvailableBouquets[],
      ISendToShowCase
    >({
      query: (bouquet) => ({
        url: "/sales/showcase",
        method: "POST",
        body: bouquet
      })
    }),
    writeOfBouquet: build.mutation<void, string>({
      query: (order_number) => ({
        url: `/sales/write_off/${order_number}`,
        method: "PUT"
      })
    }),
	sendBouquetBasket: build.mutation<void, string>({
		query: (order_number) => ({
		  url: `/sales/sendBasket/${order_number}`,
		  method: "PUT"
		})
	  })
  })
});

export const {
  useGetAllAvailableBouquetsQuery,
  useGetAvailableBouquetByIdQuery,
  useEditAvailableBouquetMutation,
  useCreateAvailableBouquetMutation,
  useWriteOfBouquetMutation,
  useSendBouquetBasketMutation,
  useGetBouquetsOnBasketQuery
} = availableBouquetsApi;
