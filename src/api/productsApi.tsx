import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCTFORMINTERFACE, PRODUCTINTERFACE, PRODUCTSIZE } from '../utils/interfaceTypes';
import { RootState } from './store/store';




export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.userData?.token;
            console.log({ token })
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),

    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<PRODUCTINTERFACE, void>({
            query: () => 'getallproducts',
            providesTags: ['Products'],
        }),

        getProductById: builder.query<any, string>({
            query: (id) => `getproduct/${id}`,
            providesTags: ['Products'],
        }),

        addProduct: builder.mutation<any, PRODUCTFORMINTERFACE>({
            query: ({ product_name, product_description, cost_price, selling_price, brand, category_id }) => ({
                url: 'addproduct',
                method: 'POST',
                body: {
                    "product_detail": {
                        product_name,
                        product_description,
                        cost_price,
                        selling_price,
                        brand,
                        category_id
                    }
                }
            }),
            invalidatesTags: ['Products'],
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (id) => (
                {
                    url: `deleteproduct/${id}`,
                    method: 'DELETE'
                }
            ),
            invalidatesTags: ['Products']
        }),


        addProductSize: builder.mutation<void, PRODUCTSIZE>({
            query: ({ id, size, quantity }) => (
                {
                    url: `addproductsize/${id}`,
                    method: 'POST',
                    body: {
                        "product_size": {
                            size,
                            quantity
                        }
                    }
                }
            ),
            invalidatesTags: ['Products']
        }),

        // addProductWithColorAndSize: builder.mutation<string, PRODUCTFORMINTERFACE>({
        //     async queryFn(args) {
        //         const productResponse: ProductResponse = await store.dispatch(productApi.endpoints.addProduct.initiate(args)).unwrap()
        //         console.log({ productResponse })
        //         if (productResponse.product_id) {
        //             const colorObj = {
        //                 id: String(productResponse.product_id),
        //                 color: "red"
        //             }
        //             const colorResponse: IColorResponse = await store.dispatch(colorApi.endpoints.addProductColor.initiate(colorObj)).unwrap()
        //             console.log({ colorResponse })

        //             if (colorResponse.id) {
        //                 console.log(colorResponse.id)
        //                 const sizeResponse = await store.dispatch(productApi.endpoints.addProductSize.initiate({ id: String(productResponse.product_id), size: "M", quantity: 1 })).unwrap()
        //                 console.log({ sizeResponse })
        //             }
        //         }
        //         return "success"
        //     },
        // }),

        deleteProductSize: builder.mutation<void, string>({
            query: (id) => (
                {
                    url: `deleteproductsize/${id}`,
                    method: 'DELETE'
                }
            ),
            invalidatesTags: ['Products']
        }),
    })
})


export const { useGetAllProductsQuery, useGetProductByIdQuery, useAddProductMutation, useAddProductSizeMutation, useDeleteProductMutation, useDeleteProductSizeMutation } = productApi;