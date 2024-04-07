import { useFormik } from "formik"
import * as Yup from 'yup';
import { useAddCategoryMutation } from "../../../api/categoryApi";
import { notify } from "../../../utils/utils";

const AddCategory = () => {

    const [addCategory] = useAddCategoryMutation()

    const formik = useFormik({
        initialValues: {
            category_name: ''
        },
        validationSchema: Yup.object({
            category_name: Yup.string().required('Category name is required')
        }),
        onSubmit: async (values) => {
            try {
                const res = await addCategory({ category_name: values.category_name })
                console.log({ res })
                notify('success', 'Category Added Successfully', 0)
                formik.resetForm()
            } catch (error) {
                console.log({ error })
                notify('error', 'Error', 0)
            }
        }
    })

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={formik.handleSubmit} >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">
                        Category Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category_name"
                        name="category_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.category_name}
                    />
                    {formik.errors.category_name ? <p className="text-red-500 text-xs italic">{formik.errors.category_name}</p> : null}
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCategory