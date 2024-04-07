import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store/store';


export const reviewApi = createApi({
    reducerPath: 'reviewApi',
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

    tagTypes: ['Review'],
    endpoints: (builder) => ({
        addProductReview: builder.mutation<any, { productId: number, review: { rating: number, review_message: string } }>({
            query: ({ productId, review }) => ({
                url: `addproductreview/${productId}`,
                method: 'POST',
                body: {
                    review
                },
            }),
            invalidatesTags: ['Review'],
        }),
        getProductReviews: builder.query<any, string>({
            query: (productId) => `getproductreviews/${productId}`,
            providesTags: ['Review'],
        }),

    })
});

// Export the API endpoints for easier access
export const { useAddProductReviewMutation, useGetProductReviewsQuery } = reviewApi;