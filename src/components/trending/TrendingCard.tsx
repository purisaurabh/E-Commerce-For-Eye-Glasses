import { Link } from "react-router-dom";
import { PRODUCTINTERFACE } from "../../utils/interfaceTypes";

import sun3 from "../../assets/sunglasses/sun12.png"
import { IMAGES } from "../../utils/constats";

interface SingleProductProps {
    product: PRODUCTINTERFACE;
    key: number;
}

const TrendingCard: React.FC<SingleProductProps> = (product) => {
    console.log({ product })
    return (
        <main>
            <Link
                to={`/products/${product?.product.id}`}
                className="flex flex-col w-60 h-60 px-4 py-2 rounded-xl  bg-black/[.06] cursor-pointer gap-3 "
            >
                <div className="flex justify-between gap-3 xs:flex-wrap xs:justify-center sm:flex-nowrap sm:justify-between">
                    <div>
                        <h1 className="text-xl xs:text-base sm:text-xl font-bold">
                            {product?.product.product_name}
                        </h1>
                    </div>
                    <div className="flex flex-col items-start ">
                        <div className="flex items-center justify-between">
                            <h1 className=" text-lg xs:text-base sm:text-lg font-bold">
                                ₹{product?.product.cost_price}
                                <del className="ml-2 text-sm text-gray-500 block">
                                    ₹{product?.product.selling_price}
                                </del>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full h-full">
                    {
                        <img
                            src={IMAGES[product?.product.id - 1]}
                            alt={product?.product.product_name}
                            className="w-32 h-20 xs:w-28 xs:h-16 sm:w-32 sm:h-20 py-2 object-cover hover:scale-110 transition"
                        />
                    }
                </div>
            </Link>
        </main>
    );
};

export default TrendingCard;
