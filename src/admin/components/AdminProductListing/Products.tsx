import React, { useState } from 'react';
import { PRODUCTINTERFACE } from '../../../utils/interfaceTypes';
import { Modal, Table } from 'antd';
import AddProductSize from './addProductSize';
import AddProductColor from './addProductColor';


interface Props {
    products: PRODUCTINTERFACE[];
    deleteProduct: (productId: number) => void;
}

const Products: React.FC<Props> = ({ products, deleteProduct }) => {
    const [open, setOpen] = useState(false);
    const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | ''>('');
    const [colorId, setColorId] = useState<number | null>(null);

    const showModal = (colorId: number) => {
        setColorId(colorId)
        setOpen(true);
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

    const showModalViewReview = (productId: number) => {
        setSelectedProductId(String(productId));
        setIsViewReviewOpen(true);
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Description',
            dataIndex: 'product_description',
            key: 'product_description',
        },
        {
            title: 'Selling Price',
            dataIndex: 'selling_price',
            key: 'selling_price',
        },
        {
            title: 'Cost Price',
            dataIndex: 'cost_price',
            key: 'cost_price',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (

                <div>
                    <button className="px-4 py-2 ml-2 text-blue-600 hover:text-blue-800" onClick={() => { showModal(record.id) }}>Add Color</button>
                    <button className="px-4 py-2 ml-2 text-green-600 hover:text-green-800" onClick={() => { showModalViewReview(record.id) }}>Add Size</button>
                    <button className="px-4 py-2 ml-2 text-red-600 hover:text-red-800" onClick={() => deleteProduct(record.id)}>Delete</button>
                </div>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className='w-full overflow-x-auto'>
                <Table columns={columns} dataSource={products} rowKey="id" pagination={{ pageSize: 6 }} />
            </div>
            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                {colorId && <AddProductColor id={colorId} />}
            </Modal>
            <Modal
                title="Size"
                centered
                open={isViewReviewOpen}
                onOk={() => setIsViewReviewOpen(false)}
                onCancel={() => setIsViewReviewOpen(false)}
                width={400}
                footer={null}
            >
                {selectedProductId && <AddProductSize id={selectedProductId} />}
            </Modal>
        </div>
    );


};

export default Products;