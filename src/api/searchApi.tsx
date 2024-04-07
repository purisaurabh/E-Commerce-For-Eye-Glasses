import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCTINTERFACE } from '../utils/interfaceTypes';
import { RootState } from './store/store';

export const searchApi = createApi({
    reducerPath: 'searchApi',
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

    tagTypes: ['Search'],
    endpoints: (builder) => ({
        getSearchProducts: builder.query<PRODUCTINTERFACE[], string>({
            query: (keywords) => `search?keywords=${keywords}`,
            providesTags: ['Search'],
        }),
    })
});

export const { useGetSearchProductsQuery } = searchApi;