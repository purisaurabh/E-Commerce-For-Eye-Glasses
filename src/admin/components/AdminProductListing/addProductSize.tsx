import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useAddProductSizeMutation } from '../../../api/productsApi';
import { notify } from '../../../utils/utils';
import { useGetAllColorQuery } from '../../../api/colorApi';

interface Props {
    id: string
}

const AddProductSize: React.FC<Props> = ({ id }) => {

    const [addProductSize] = useAddProductSizeMutation()
    const { data: colorData } = useGetAllColorQuery(id)
    const [selectedColorId, setSelectedColorId] = useState<number>(colorData?.[0].id);
    console.log({ selectedColorId })
    console.log({ colorData })

    const formik = useFormik({
        initialValues: {
            size: "",
            quantity: 0
        },
        validationSchema: Yup.object({
            size: Yup.string().required('Size is required'),
            quantity: Yup.number().required('Quantity is required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await addProductSize({ id: String(selectedColorId), ...values }).unwrap()
                console.log({ response })
                notify('success', 'Size added successfully', 0)
                formik.resetForm()
            } catch (error) {
                notify('error', 'Failed to add size', 0)
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
                <select
                    name="color"
                    onChange={(e) => setSelectedColorId(Number(e.target.value))}
                    onBlur={formik.handleBlur}
                    className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                >
                    {colorData && colorData.map((color: any, index: any) => (
                        <option key={index} value={color.id}>{color.color}</option>
                    ))}
                </select>
                <label className="flex flex-col">
                    <div className="flex space-x-4">
                        <h1>Size : </h1>
                        <label>
                            <input
                                type="radio"
                                value="S"
                                checked={formik.values.size === 'S'}
                                onChange={formik.handleChange}
                                name="size"

                            />
                            S
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="M"
                                checked={formik.values.size === 'M'}
                                onChange={formik.handleChange}
                                name="size"
                            />
                            M
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="L"
                                checked={formik.values.size === 'L'}
                                onChange={formik.handleChange}
                                name="size"
                            />
                            L
                        </label>
                    </div>
                    {formik.touched.size && formik.errors.size ? (
                        <div className="flex justify-center items-center text-red-500 text-sm">{formik.errors.size}</div>
                    ) : null}
                </label>
                <label className="flex flex-col">

                    <input
                        type="number"
                        placeholder='Quantity'
                        className="border rounded-md p-1.5 shadow-sm"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="quantity"
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                        <div className="flext justify-center item-center text-red-500 text-sm">{formik.errors.quantity}</div>
                    ) : null}
                </label>
                <div className="w-full py-2   flex flex-col gap-4 items-center ">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 cursor-pointer"
                        disabled={
                            !formik.values.size || !formik.values.quantity
                        }
                    >
                        Add Size
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddProductSize
