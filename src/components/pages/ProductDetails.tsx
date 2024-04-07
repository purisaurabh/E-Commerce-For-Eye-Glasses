import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useGetProductByIdQuery } from '../../api/productsApi';
import sun2 from '../../assets/sunglasses/sun2.png';
import { notify } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { useAddProductToCartMutation } from '../../api/cartApi';
import { useSelector } from 'react-redux';
import { useGetAllColorQuery } from '../../api/colorApi';

const ProductDetails = () => {
    const { productId } = useParams();
    const id = String(productId);
    const navigate = useNavigate();
    const { data: product, isLoading } = useGetProductByIdQuery(id);
    const token = useSelector((state: any) => state.auth.userData?.token);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState<number>();

    console.log({ product })
    const [addProductToCart] = useAddProductToCartMutation();
    const { data: colorData } = useGetAllColorQuery(product?.product_detail?.id)
    // const { data: sizeData } = useGetAllSizeQuery(id);


    const [selectedColor, setSelectedColor] = useState('');
    const selectedColorObject = product?.product_colors?.find((element: any) => element?.color === selectedColor);
    useEffect(() => {
        if (product) {
            setSelectedColor(product.product_colors[0]?.color);
        }
        if (selectedColorObject?.product_size.length === 1) {
            setSize(selectedColorObject.product_size[0].id);
        }
    }, [product, selectedColorObject]);

    if (isLoading) return <div>Loading...</div>;



    console.log('selectedColor:', selectedColor);
    console.log('selectedColorObject:', selectedColorObject);
    console.log('sizes:', selectedColorObject?.product_size);



    return (
        <div className="pt-20 flex justify-center items-center">
            <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
                <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 max-w-screen-lg mx-auto">
                    <section className="relative bg-black bg-opacity-10 p-7 rounded-lg">
                        <img src={sun2} alt="" className="w-full object-contain max-w-xs mx-auto" />
                    </section>

                    <section className="p-7 px-10 rounded-md shadow-md bg-white bg-opacity-70 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl sm:text-4xl font-bold">{product?.product_detail.product_name}</h1>
                            <p className="text-gray-600 text-base">{product?.product_detail.product_description}</p>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-400">({4.5}) Rating</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">About Product</h2>
                            <ul className="flex flex-col gap-2">
                                <li><span className="text-gray-500 text-sm">Brand:</span> {product?.product_detail.brand}</li>
                                <li className="flex items-center space-x-4">
                                    <span className="text-gray-500 text-sm">Color:</span>
                                    {colorData ? (
                                        <select onChange={(e) => setSelectedColor(e.target.value)}>
                                            {colorData?.map((color: any) => (
                                                <option key={color.id} value={color.color}>{color.color}</option>
                                            ))}
                                        </select>
                                    ) : (

                                        <span>No colors available</span>
                                    )}
                                </li>
                                <li className="flex items-center space-x-4">
                                    <span className="text-gray-500 text-sm">Size:</span>
                                    {selectedColorObject?.product_size.length ? (
                                        <select onChange={(e) => {
                                            console.log("log size : ", e.target.value)
                                            setSize(Number(e.target.value))
                                        }}>
                                            {selectedColorObject?.product_size.map((size: any) => (
                                                <option key={size?.id} value={size?.id}>{size?.size}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span>No sizes available</span>
                                    )}
                                </li>
                                <li>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500 text-sm">Quantity:</span>
                                        <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1} className="font-bold p-1 rounded">-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="font-bold p-1 rounded">+</button>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-2 items-center">
                            Price: <span className="text-xl sm:text-2xl text-amber-600">₹{product?.product_detail.cost_price}</span>
                            <span className="text-sm text-gray-600 line-through">₹{product?.product_detail.selling_price}</span>
                        </div>

                        <div className={`w-full flex gap-4 items-center flex-wrap`}>
                            <button
                                className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
                                onClick={() => {
                                    if (!token) {
                                        navigate("/login", { state: { from: location.pathname } });
                                        notify("warn", "Please Login to continue", 0);
                                    } else if (size === undefined) {
                                        notify("warn", "Please select a size", 0);
                                    }
                                    else {
                                        addProductToCart({
                                            product_size_id: size,
                                            quantity: quantity
                                        });
                                        navigate("/cart");
                                        notify("success", "Product added to cart", 0);
                                    }
                                }}
                            >
                                <HiOutlineShoppingBag className="text-xl" /> Add To Bag

                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div >
    );
};

export default ProductDetails;