import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddProductMutation } from '../../../api/productsApi';
import { notify } from '../../../utils/utils';

interface ProductFormProps {
    handleCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ handleCancel }) => {

    const [productForm] = useAddProductMutation()
    // const [addProdct] = useAddProductWithColorAndSizeMutation()

    const initialValues = {
        product_name: '',
        product_description: '',
        cost_price: '',
        selling_price: '',
        brand: '',
        category_id: ''
    };

    const validationSchema = Yup.object({
        product_name: Yup.string()
            .required('Product name must be provided')
            .matches(/^[a-zA-Z0-9 ]*$/, 'Product name must not contain special characters'),
        product_description: Yup.string()
            .required('Product description must be provided')
            .matches(/^[a-zA-Z0-9 ]*$/, 'Product description must not contain special characters'),
        cost_price: Yup.number().required('Cost price must be provided'),
        selling_price: Yup.number().required('Selling price must be provided'),
        brand: Yup.string()
            .required('Brand must be provided')
            .matches(/^[a-zA-Z0-9 ]*$/, 'Brand must not contain special characters'),
        category_id: Yup.number().required('Category must be provided')
    });

    const onSubmit = async (values: any) => {
        console.log({ values })
        try {
            await productForm(values).unwrap()
            // if (res.status === 200 || res.status === 201) {
            //     notify('success', 'Product Added Successfully', 0)
            //     formik.resetForm()
            // }
            notify('success', 'Product Added Successfully', 0)
        } catch (error) {
            console.log(error)
            notify('error', 'Some Error Occured', 0)
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values)}
        >
            <Form>
                <div className='flex justify-center item-center font-bold'><h1>Add Product</h1> </div>
                <div>
                    <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">Product Name</label>
                    <Field type="text" id="product_name" name="product_name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <ErrorMessage name="product_name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                    <label htmlFor="product_description" className="block text-sm font-medium text-gray-700">Product Description</label>
                    <Field type="text" id="product_description" name="product_description" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <ErrorMessage name="product_description" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                    <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700">Cost Price</label>
                    <Field type="number" id="cost_price" name="cost_price" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <ErrorMessage name="cost_price" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                    <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700">Selling Price</label>
                    <Field type="number" id="selling_price" name="selling_price" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <ErrorMessage name="selling_price" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <Field type="text" id="brand" name="brand" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
                    <Field type="number" id="category_id" name="category_id" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <ErrorMessage name="category_id" component="div" className="text-red-500 text-sm" />
                </div>
                <button type="submit"
                    onClick={handleCancel}
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </Form>
        </Formik>
    );
};

export default ProductForm;