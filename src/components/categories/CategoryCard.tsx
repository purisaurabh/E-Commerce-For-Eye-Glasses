import { CATEGORYINTERFACE } from "../../utils/interfaceTypes";
import vision from "../../assets/categories/visionmod1.jpg";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
    product: CATEGORYINTERFACE
    key: number;
    category: CATEGORYINTERFACE
}



const CategoryCard: React.FC<CategoryProps> = (category) => {
    const navigate = useNavigate();
    console.log({ category })
    let id = String(category?.category?.id);
    console.log({ id })

    const clickHandler = () => {
        navigate("/products", { state: { from: "category", id } });
    };
    return (
        <section
            className=" flex flex-col items-center rounded-xl  bg-black/[.06] cursor-pointer gap-3 relative overflow-hidden"
            onClick={clickHandler}
        >
            <img
                src={vision}
                alt={category?.product?.category_name}
                className="rounded-xl h-full w-full object-cover transition-all delay-75 ease-out"
            />
            <div
                className="
             flex flex-col w-full h-full justify-center items-center
            transition-all delay-75 absolute left-0 right-0 bottom-0 top-0 bg-black/[0.3] rounded-xl"

            >
                <h1 className="text-4xl xs:text-6xl sm:text-8xl lg:text-6xl capitalize text-white shadow-sm p-3 break-all">

                    {category?.category?.category_name}
                </h1>
            </div>
        </section>
    );
};

export default CategoryCard;
