import React from 'react';
import { CARTINTERFACE } from "../../utils/interfaceTypes";
import cartImage from '../../assets/sports/sports1.png'
import { useDeleteCartItemMutation } from '../../api/cartApi';
import { notify } from '../../utils/utils';


interface SingleCartProps {
    product: CARTINTERFACE;
}

const CartItemCard: React.FC<SingleCartProps> = ({ product }) => {

    console.log({ product })
    const [delectCartItem] = useDeleteCartItemMutation();
    const handleDelete = () => {
        console.log("id of product ", product?.size_id)
        if (product?.size_id) {
            let id = String(product.size_id);
            console.log("type is ", typeof id)
            delectCartItem(id);
            notify('success', 'Product Deleted Successfully', 0);
        }
    }

    return (
        <div className="flex items-center bg-white shadow-lg rounded-lg m-1 h-auto">
            <img src={cartImage} alt={product.product_name} className="w-1/4 object-cover rounded-lg" />
            <div className="w-1/4 ml-4">
                <h2 className="text-2xl font-bold mb-2 text-gray-700">{product.product_name}</h2>
                <p className="text-sm mb-1 text-gray-500">Color: <span className="font-medium text-gray-700">{product.color}</span></p>
                <p className="text-sm mb-1 text-gray-500">Size: <span className="font-medium text-gray-700">{product.size}</span></p>
                <p className="text-sm mb-1 text-gray-500">Quantity: <span className="font-medium text-gray-700">{product.quantity}</span></p>
            </div>
            <div className="w-1/4 ml-4">
                <p className="text-lg font-bold mb-1 text-gray-500">Price</p>
                <p className="text-lg font-bold mb-1 text-gray-700 ">₹{product.price}</p>
            </div>
            <div className="w-1/4 ml-4">
                <p className="text-lg font-bold mb-1 text-gray-500">Total Price</p>
                <p className="text-lg font-bold mb-1 text-gray-700 ">₹{product.total_price}</p>
            </div>
            <div className="w-1/4 ml-4 flex items-center justify-center">
                <button
                    onClick={handleDelete}
                    className="font-bold text-black p-2 m-2 rounded-lg"
                >
                    &#10005;
                </button>
            </div>
        </div>
    )
}

export default CartItemCard;