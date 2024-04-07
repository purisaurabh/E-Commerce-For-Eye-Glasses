
import { useState } from 'react'
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../api/productsApi'
import Spinner from '../../../assets/Circles-menu-3.gif'
import Products from './Products'
import { Modal } from 'antd'
import ProductForm from './productForm'
import AddCategory from '../AdminCategory/addCategory'
import ErrorPage from '../../../components/pages/ErrorPage'


const Product = () => {
    const { data: products, isLoading, error } = useGetAllProductsQuery()
    const [deleteProduct] = useDeleteProductMutation()
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const showModalViewReview = () => {
        setIsViewReviewOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    if (error) {
        return <ErrorPage />
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-5">Products</h1>
                <div>
                    <button onClick={showModalViewReview} className="mb-3 mr-3 bg-blue-500 text-white p-2 rounded-lg">Add Category</button>
                    <button onClick={showModal} className="mb-3 bg-blue-500 text-white p-2 rounded-lg">Add Product</button>
                </div>

            </div>

            {
                isLoading ? (
                    <img src={Spinner} alt="Loading..." />
                ) : (
                    products ? (
                        <Products products={products} deleteProduct={deleteProduct} />
                    ) : (
                        <h1>No Products</h1>
                    )
                )
            }

            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <ProductForm handleCanel={handleCancel} />
            </Modal>
            <Modal
                centered
                open={isViewReviewOpen}
                onOk={() => setIsViewReviewOpen(false)}
                onCancel={() => setIsViewReviewOpen(false)}
                width={400}
                footer={null}
            >
                <AddCategory />
            </Modal>
        </div>
    )
}

export default Product
