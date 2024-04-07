import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORYINTERFACE } from '../utils/interfaceTypes';
import { RootState } from './store/store';


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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

    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getAllCategory: builder.query<CATEGORYINTERFACE, void>({
            query: () => 'getallcategories',
            providesTags: ['Category'],
        }),
        getAllProductByCategory: builder.query<CATEGORYINTERFACE[], string>({
            query: (id) => `getproductsbycategory/${id}`,
            providesTags: ['Category'],
        }),
        addCategory: builder.mutation<any, { category_name: string }>({
            query: ({ category_name }) => ({
                url: 'addcategory',
                method: 'POST',
                body: {
                    "category": {
                        category_name
                    }
                }
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id) => (
                {
                    url: `deletecategory/${id}`,
                    method: 'DELETE'
                }
            ),
            invalidatesTags: ['Category']
        })

    })
});

// Export the API endpoints for easier access
export const { useGetAllCategoryQuery, useGetAllProductByCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation } = categoryApi;