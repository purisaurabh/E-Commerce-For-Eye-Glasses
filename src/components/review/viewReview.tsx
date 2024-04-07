
import { useGetProductReviewsQuery } from "../../api/reviewApi"

interface ViewReviewProps {
    productId: number;
}

const ViewReview: React.FC<ViewReviewProps> = ({ productId }) => {
    console.log("object", productId)

    const { data: reviews, isLoading } = useGetProductReviewsQuery(String(productId))
    console.log("review", reviews)

    return (
        <div className="grid grid-cols-3 gap-4">
            {isLoading ? (
                <p className="flext justify-center item-center font-bold">Loading...</p>
            ) : reviews ? (reviews?.map((review: any) => (
                <div key={productId} className="p-4 border rounded shadow-lg bg-white">
                    <p className="font-bold text-lg text-blue-600">Rating: {review.rating}</p>
                    <p className="text-gray-600">{review?.review_message}</p>
                </div>
            ))
            ) : (
                <p className="font-sans text-1xl  font-bold uppercase text-gray-300 text-center ml-20">
                    Nothing to Show!
                </p>
            )
            }
        </div>
    )
}

export default ViewReview