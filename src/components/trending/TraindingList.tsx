import { useGetAllProductsQuery } from "../../api/productsApi";
import { PRODUCTINTERFACE } from "../../utils/interfaceTypes";
import TrendingCard from "./TrendingCard";
import Spinner from '../../assets/Circles-menu-3.gif'


const TraindingList = () => {
    const { data: trendingProducts, isLoading } = useGetAllProductsQuery()
    console.log({ trendingProducts })
    if (isLoading) return <div
        className="flex justify-center items-center h-[70vh]"
    ><img src={Spinner} alt="Loading..." /></div>
    return (
        <main className='flex justify-center items-center py-1 mb-5 relative'>
            <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 py-4 mt-10">
                <h1 className="col-span-full text-3xl md:text-4xl lg:text-5xl whitespace-nowrap text-center">
                    Trending Products
                </h1>

                {trendingProducts && trendingProducts.slice(0, 8).map((product: PRODUCTINTERFACE) => (
                    <TrendingCard key={product.id} product={product} />
                ))}
            </section>
        </main>
    );
}

export default TraindingList
