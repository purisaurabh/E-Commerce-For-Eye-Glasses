import loadingGif from '../../assets/loading.gif';
import { skipToken } from '@reduxjs/toolkit/query';
import bannerImg from '../../assets/download.jpg'
import { useEffect, useMemo, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import SingleProduct from '../products/SingleProduct';
import { PRODUCTINTERFACE } from '../../utils/interfaceTypes';
import { useGetAllProductsQuery } from '../../api/productsApi';
import { useLocation } from 'react-router-dom';
import { useGetAllProductByCategoryQuery } from '../../api/categoryApi';
import Pagination from '../pagination/Pagination';
let PageSize = 6;

const ProductListing = () => {
    const [showScrollArrow, setShowScrollArrow] = useState(false)
    const location = useLocation();
    const state = location.state;

    const { data: productData, isLoading } = useGetAllProductsQuery(state?.id ? skipToken : undefined)
    const { data } = useGetAllProductByCategoryQuery(state?.id ? state.id : skipToken)
    console.log({ data })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const [currentPage, setCurrentPage] = useState(1);




    const RenderComponent = ({ productData }: { productData: any }) => {

        const currentTableData = useMemo(() => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return productData?.slice(firstPageIndex, lastPageIndex);
        }, [currentPage]);

        return (
            <div className="pt-20" >
                <header className='flex justify-center item-center'>
                    <img src={bannerImg} alt='Banner Image' />
                </header >

                <section className='flex flex-left ml-40'>
                    <h1 className='text-md sm:text-7xl lg:text-4xl font-semibold py-10 w-full mt-10 font-serif'>Glasses for you!!</h1>
                </section>

                <div className='px-40'>
                    {
                        currentTableData && currentTableData?.length > 0 ? (
                            <main className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                                {currentTableData.map((product: PRODUCTINTERFACE) => (
                                    <SingleProduct key={product.id} product={product} />
                                ))}
                            </main>
                        ) : (
                            <p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
                                Nothing to Show!
                            </p>
                        )
                    }
                </div>


                <button
                    className={` fixed bottom-10 bg-gray-800 right-2 p-2 rounded-full text-xl shadow-2xl transition-all delay-100 ease-in-out ${showScrollArrow ? "block" : "hidden"
                        }`}
                    onClick={scrollToTop}
                >
                    <MdKeyboardArrowUp className=" text-white" />
                </button>
                <Pagination
                    currentPage={currentPage}
                    totalCount={productData?.length}
                    pageSize={PageSize}
                    onPageChange={(page: any) => setCurrentPage(page)}
                />
            </div >
        )
    }




    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 300) {
                setShowScrollArrow(true)
            } else {
                setShowScrollArrow(false)
            }
        }
        window.addEventListener("scroll", scrollHandler)
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])



    return (
        <>
            {
                isLoading ? (
                    <div>
                        <span>
                            <img src={loadingGif} alt="loading..." />
                        </span>
                    </div>
                ) : (<RenderComponent productData={state?.id ? data : productData} />

                )
            }
        </>
    )
}

export default ProductListing

