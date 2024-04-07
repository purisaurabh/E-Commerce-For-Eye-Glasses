import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store/store';
import { USER } from '../utils/interfaceTypes';


export const userOperation = createApi({
    reducerPath: 'userOPerationApi',
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

    tagTypes: ['Operation'],
    endpoints: (builder) => ({
        getAllUser: builder.query<USER[], void>({
            query: () => ({
                url: 'getallusers',
            }),
            providesTags: ['Operation'],
        }),
        getParticularUser: builder.query<USER, string>({
            query: (id) => `getuser/${id}`,
            providesTags: ['Operation'],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => (
                {
                    url: `deleteuser/${id}`,
                    method: 'DELETE'
                }
            ),
            invalidatesTags: ['Operation']
        })

    })
});

// Export the API endpoints for easier access
export const { useGetAllUserQuery, useGetParticularUserQuery, useDeleteUserMutation } = userOperation;