import { GiRoundStar } from "react-icons/gi";
import { useNavigate } from "react-router";
import { notify } from "../../utils/utils";
import AddReview from "../review/addReview";
import ViewReview from "../review/viewReview";
import { PRODUCTINTERFACE } from "../../utils/interfaceTypes";
import sun1 from "../../assets/sunglasses/sun1.png";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";


interface SingleProductProps {
    product: PRODUCTINTERFACE;
    key: number;
}


const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
    const navigate = useNavigate();
    const token = useSelector((state: any) => state.auth.userData?.token);

    console.log(product?.id, "product id")
    console.log(typeof product?.id, "type of product id")


    const [open, setOpen] = useState(false);
    const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
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

    const showModalViewReview = () => {
        setIsViewReviewOpen(true);
    };

    return (

        <div
            className="flex flex-col xs:flex-row sm:flex-col  bg-white/[0.5] rounded-lg shadow-md border-2 border-black/[0.05] overflow-hidden
      cursor-pointer
      transition-transform
      hover:scale-[1.02] hover:shadow-lg"
        >
            <div
                className="flex items-center justify-center p-10 xs:p-5 sm:p-10 bg-black/[0.075] h-1/2 xs:h-full sm:h-1/2 xs:w-1/2 w-full sm:w-full"
                onClick={() => {
                    navigate(`/products/${product?.id}`);
                }}
            >
                <img
                    src={sun1}
                    alt=""
                    className="w-full object-cover xs:object-contain sm:object-cover h-28"
                />
            </div>

            <div className="p-3 flex flex-col justify-between gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
                <div>
                    <div className=" flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-xl font-medium">{product?.product_name}</span>
                            <span className="flex items-center gap-1">
                                <span>{4.5}</span>

                                <GiRoundStar className=" text-yellow-400 mb-1" />
                                <span className="text-xs text-gray-400">Rating</span>
                            </span>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-amber-600">₹{product?.cost_price}</span>
                            <span className="text-sm text-gray-600 line-through">
                                {product?.selling_price}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">{product?.brand}</p>
                </div>
                <div className="w-full pt-2 border-t flex justify-between items-center">
                    <button
                        className="relative bg-blue-500 text-white p-2 rounded-full hover:bg-yellow-800 cursor-pointer mx-2 transition shadow-sm"
                        onClick={() => {
                            if (!token) {
                                navigate("/login", { state: { from: location.pathname } });
                                notify("warn", "Please Login to continue", 0);
                            } else {
                                navigate(`/products/${product?.id}`)
                            }
                        }}
                    >
                        <HiOutlineShoppingBag />
                    </button>
                    <button
                        className="border border-green-500 bg-green-500 text-white py-1.5 text-xs whitespace-nowrap rounded-full px-6 hover:bg-green-700 transition hover:shadow-md"
                        onClick={() => {
                            if (!token) {
                                navigate("/login", { state: { from: location.pathname } });
                            } else {
                                showModal();
                            }

                        }}
                    >
                        Add Review
                    </button>


                    <button
                        className="border border-yellow-500 bg-yellow-500 text-white py-1.5 text-xs whitespace-nowrap rounded-full px-6 hover:bg-yellow-700 transition hover:shadow-md"
                        onClick={() => {
                            if (!token) {
                                navigate("/login", { state: { from: location.pathname } });
                            } else {
                                // <ViewReview productId={product?.id} />;
                                showModalViewReview();
                            }
                        }}
                    >
                        View Reviews
                    </button>

                </div>
            </div>
            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <AddReview productId={product?.id} handleCancel={handleCancel} />
            </Modal>
            <Modal
                title="Reviews"
                centered
                open={isViewReviewOpen}
                onOk={() => setIsViewReviewOpen(false)}
                onCancel={() => setIsViewReviewOpen(false)}
                width={1000}
                footer={null}
            >
                <ViewReview productId={product?.id} />
            </Modal>
        </div>
    );
};

export default SingleProduct;



