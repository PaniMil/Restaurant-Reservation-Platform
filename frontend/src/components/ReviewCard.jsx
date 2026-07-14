function ReviewCard({

    review,

    restaurant,

    onDelete

}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between">

            <div>

                <h2 className="text-2xl font-semibold">

                    {restaurant?.name}

                </h2>

                <p className="text-yellow-500 mt-2">

                    {"⭐".repeat(review.rating)}

                </p>

                {review.comment && (

                    <p className="text-gray-600 mt-3">

                        {review.comment}

                    </p>

                )}

            </div>

            <button

                onClick={onDelete}

                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

            >

                Delete

            </button>

        </div>

    );

}

export default ReviewCard;