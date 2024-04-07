import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store/store';


export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.auth?.userData?.token;
            console.log({ token })
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getAllCartItem: builder.query<any, void>({
            query: () => 'viewcart',
            providesTags: ['Cart'],
        }),
        addProductToCart: builder.mutation<any, { product_size_id: number, quantity: number }>({
            query: ({ product_size_id, quantity }) => ({
                url: 'addtocart',
                method: 'POST',
                body: { product_size_id, quantity }
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteCartItem: builder.mutation<void, string>({
            query: (id) => ({
                url: `removeproduct/${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['Cart'],
        }),
    })
});

// Export the API endpoints for easier access
export const { useGetAllCartItemQuery, useAddProductToCartMutation, useDeleteCartItemMutation } = cartApi;