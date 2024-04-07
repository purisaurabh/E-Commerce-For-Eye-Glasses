import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { notify } from '../../../utils/utils';
import { useAddProductColorMutation, useGetAllColorQuery } from '../../../api/colorApi';

interface Props {
    id: number
}

const AddProductColor: React.FC<Props> = ({ id }) => {
    const productID = String(id)
    const [addProductColor] = useAddProductColorMutation()
    const { data: colorData } = useGetAllColorQuery(productID);
    console.log({ colorData })
    const formik = useFormik({
        initialValues: {
            color: ""
        },
        validationSchema: Yup.object({
            color: Yup.string().required('Color is required').matches(/^[a-zA-Z0-9 ]*$/, 'Product name must not contain special characters'),
        }),
        onSubmit: async (values) => {
            try {
                if (colorData && colorData.some((color: string) => color.color === values.color)) {
                    notify('error', 'Color already exists', 0)
                    return
                }
                const response = await addProductColor({ id: productID, color: values.color }).unwrap()
                console.log({ response })
                notify('success', 'Color added successfully', 0)
                formik.resetForm()
            } catch (error) {
                console.log({ error })
                notify('error', 'Failed to add color', 0)
            }
        }

    })
    return (
        <div>
            <form
                action=""
                className="flex flex-col gap-3"
                onSubmit={formik.handleSubmit}
            >
                <label className="flex flex-col">
                    <input
                        type="string"
                        placeholder='Color'
                        className="border rounded-md p-1.5 shadow-sm"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="color"
                    />
                    {formik.touched.color && formik.errors.color ? (
                        <div className="flext justify-center item-center text-red-500 text-sm">{formik.errors.color}</div>
                    ) : null}
                </label>

                <div className="w-full py-2   flex flex-col gap-4 items-center ">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 cursor-pointer"
                        disabled={
                            !formik.values.color
                        }
                    >
                        Add Color
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddProductColor
