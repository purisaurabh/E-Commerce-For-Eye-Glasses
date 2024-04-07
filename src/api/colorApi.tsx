import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store/store';


export const colorApi = createApi({
    reducerPath: 'colorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.auth?.userData?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    tagTypes: ['Color'],
    endpoints: (builder) => ({
        getAllColor: builder.query<any, string>({
            query: (id) => `getallproductcolors/${id}`,
            providesTags: ['Color'],
        }),
        getAllSize: builder.query<any, string>({
            query: (id) => `getallproductsize/${id}`,
            providesTags: ['Color'],
        }),
        addProductColor: builder.mutation<any, { id: string, color: string }>({
            query: ({ id, color }) => ({
                url: `addproductcolor/${id}`,
                method: 'POST',
                body: {
                    "product_color":
                    {
                        color
                    }
                },
            }),
            invalidatesTags: ['Color'],
        }),
        deleteProduct: builder.mutation<any, string>({
            query: (productId) => `deleteproductcolor/${productId}`,
            invalidatesTags: ['Color'],
        }),

    })
});

export const { useAddProductColorMutation, useDeleteProductMutation, useGetAllColorQuery, useGetAllSizeQuery } = colorApi;
;