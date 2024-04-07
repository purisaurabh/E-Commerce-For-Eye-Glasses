import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store/store';
import { BASE_URL } from '../utils/constats';


export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.auth?.userData?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    tagTypes: ['Order'],
    endpoints: (builder) => ({
        placeOrder: builder.query<void, void>({
            query: () => `placeorder`,
            providesTags: ['Order'],
        }),

    })
});

// Export the API endpoints for easier access
export const { usePlaceOrderQuery } = orderApi;