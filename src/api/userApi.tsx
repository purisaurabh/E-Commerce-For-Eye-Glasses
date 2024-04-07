import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LOGIN } from '../utils/interfaceTypes';

// Create the API slice
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),

    tagTypes: ['User'],
    endpoints: (builder) => ({
        signup: builder.mutation<void, { first_name: string, email: string, password: string, mobile_no: string }>({
            query: ({ first_name, email, password, mobile_no }) => ({
                url: 'signup',
                method: 'POST',
                body: {
                    "user": {
                        first_name,
                        email,
                        password,
                        address: "some address",
                        city: "pune",
                        postal_code: 100000,
                        mobile_no,
                        dob: "1999-09-09"
                    }
                }
            }),

            invalidatesTags: ['User']
        }),

        login: builder.mutation<LOGIN, { email: string, password: string }>({
            query: ({ email, password }) => ({
                url: 'login',
                method: 'POST',
                body: {
                    "user": {
                        email,
                        password
                    }
                }
            }),
            invalidatesTags: ['User']
        }),
    })
});

export const { useSignupMutation, useLoginMutation } = userApi;