import { FormEvent, useState } from 'react';
import { notify } from '../../utils/utils';
import { useAddProductReviewMutation } from '../../api/reviewApi';


interface AddReviewProps {
    productId: number;
    handleCancel: () => void;
}

const AddReview: React.FC<AddReviewProps> = ({ productId, handleCancel }) => {
    console.log("Product Id ", productId)
    const [rating, setRating] = useState<number>();
    const [reviewMsg, setReviewMessage] = useState('');

    const [mutateAsync] = useAddProductReviewMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log({ rating, reviewMsg });

        try {
            await mutateAsync({ productId, review: { rating, review_message: reviewMsg } });
            console.log("rating ", rating)
            console.log("message ", reviewMsg)
            console.log("productId ", productId)
            notify('success', 'Review Added Successfully', 0);
        } catch (error) {
            notify('error', 'Some Error Occured', 0);
            console.log("In Add Review ", Error)
        }
    };

    return (
        // <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

            <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">Add Review</h1>
            <div className="flex flex-col gap-3">
                <label htmlFor="rating" className="text-lg font-semibold text-gray-700">
                    Rating
                </label>
                <input
                    type="number"
                    name="rating"
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border-2 border-gray-200 rounded-md p-2 focus:outline-none focus:border-blue-500 transition"
                />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="review" className="text-lg font-semibold text-gray-700">
                    Review
                </label>
                <textarea
                    name="review"
                    id="review"
                    value={reviewMsg}
                    onChange={(e) => setReviewMessage(e.target.value)}
                    className="border-2 border-gray-200 rounded-md p-2 h-32 focus:outline-none focus:border-blue-500 transition"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full mt-4 hover:bg-blue-700 transition"
                onClick={handleCancel}
            >
                Submit Review
            </button>
        </form>
        // </div>
    );
};

export default AddReview;