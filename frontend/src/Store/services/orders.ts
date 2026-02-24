import { api } from '../../features';
import { IOrder, IOrders } from '../../interfaces/IOrder';

const ordersApi = api.injectEndpoints({
	endpoints: (build) => ({
		getAllOrders: build.query<IOrders[], void>({
			query: () => '/sales',
			providesTags: () => [{ type: 'Orders', id: 'LIST' }],
		}),
		getOrderById: build.query<IOrder[], string>({
			query: (id) => `/sales/${id}`,
			providesTags: () => [{ type: 'Order', id: 'LIST' }],
		}),
	}),
});

export const {
	useGetAllOrdersQuery,
	useGetOrderByIdQuery
} = ordersApi;
