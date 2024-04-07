import { CARTINTERFACE } from '../../utils/interfaceTypes'
import CartItemCard from '../cart/CartItemCard'
import { useGetAllCartItemQuery } from '../../api/cartApi'
import Spinner from '../../assets/Circles-menu-3.gif'
// import { usePlaceOrderQuery } from '../../api/orderApi'



const Cart = () => {
    const { data, isLoading } = useGetAllCartItemQuery()
    // const { placeOrder } = usePlaceOrderQuery()
    return (
        <div className='py-2'>
            {isLoading ? (
                <img src={Spinner} alt="Loading..." />
            ) : data?.length > 0 ? (
                <>
                    <h1 className='text-2xl font-bold p-3'> Bag({data.length})</h1>
                    <div>
                        <main className="p-1">
                            {
                                data.map((product: CARTINTERFACE) => (
                                    <div className='w-full flex justify-center'>
                                        <div className=''>
                                            <CartItemCard product={product} />
                                        </div>
                                    </div>
                                ))
                            }
                        </main>
                        <div className='flex justify-center items-center'>
                            <button
                                // onClick={placeOrder}
                                className='bg-blue-500 text-white p-2 rounded-lg'>Place Order</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className='flex justify-center items-center h-[70vh]'>
                    <h1 className='text-2xl'>Cart is empty. Please add the product</h1>
                </div>
            )}
        </div>
    )
}

export default Cart
