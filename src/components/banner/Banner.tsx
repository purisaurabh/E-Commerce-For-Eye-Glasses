
import { useNavigate } from 'react-router-dom'
import bannerImg from '../../assets/bannerImg.png'
import { BsArrowDownRightCircle } from 'react-icons/bs'
import { RefObject } from 'react'

interface BannerProps {
    catRef: RefObject<HTMLElement>
}

const Banner: React.FC<BannerProps> = ({ catRef }) => {
    const navigate = useNavigate()
    return (
        <main className='flex justify-center items-center py-1 mb-5 relative'>
            <section className='max-w-xl mx-auto sm:mx-0  w-full py-2  lg:w-1/3 '>
                <h1 className='text-md sm:text-7xl lg:text-8xl font-semibold py-10 w-full mt-10 font-serif'>
                    Glasses & Lens
                </h1>
                <p className='py-2 text-md text-gray-600 font-serif leading-7 tracking-widest'>
                    Get the best glasses and lens at the best price
                    <br />
                    Try Something new Today with EyeGlamour
                </p>

                <section className="flex space-x-8 items-center">
                    <button className='btn-primary text-sm md:text-base bg-blue-500 text-white py-2 px-4 rounded'
                        onClick={() => navigate("/products")}
                    >
                        Start Shopping
                    </button>
                    <button
                        className="p-3 flex items-center bg-green-500 text-white py-2 px-4 rounded"
                        onClick={() => {
                            if (catRef.current !== null) {
                                catRef.current.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }

                        }}
                    >
                        <span className='mx-2 text-sm md:text-base'>Expore More</span>
                        <BsArrowDownRightCircle className="text-lg" />
                    </button>
                </section>
            </section>
            <section className="hidden w-1/ h-1/2  lg:flex justify-end mt-12">
                <img src={bannerImg} alt="Banner Image" className="w-2/3 h-full" />
            </section>
        </main >
    )
}

export default Banner
