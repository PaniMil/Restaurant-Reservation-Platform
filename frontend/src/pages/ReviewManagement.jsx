import { useEffect, useState } from "react";

import {
    getAllRatings,
    deleteRating
} from "../services/rating";

import { getRestaurants } from "../services/restaurants";

function ReviewManagement() {

    const [reviews, setReviews] = useState([]);

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {

        loadRestaurants();

        loadReviews();

    }, []);

    async function loadRestaurants() {

    try {

        const data = await getRestaurants();

        setRestaurants(data);

    }

    catch (err) {

        console.log(err);

    }

}

async function loadReviews() {

    try {

        const data = await getAllRatings();

        setReviews(data);

    }

    catch (err) {

        console.log(err);

    }

}

    async function handleDelete(id) {

    const confirmDelete = window.confirm(

        "Delete this review?"

    );

    if (!confirmDelete) return;

    try {

        await deleteRating(id);

        await loadReviews();

        alert("Review deleted.");

    }

    catch (err) {

        alert(err.message);

    }

}

    return (

        <div className="min-h-screen bg-orange-50 py-10 px-8">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-orange-600 mb-8">

                    Review Management

                </h1>

                <div className="space-y-6">

                    {reviews.map((review) => {

                        const restaurant = restaurants.find(

                            (restaurant) =>

                                restaurant.id === review.restaurant_id

                        );

                        return (

                            <div
                                key={review.id}
                                className="bg-white rounded-xl shadow-md p-6 flex justify-between"
                            >

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

                                    onClick={() => handleDelete(review.id)}

                                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                                >

                                    Delete

                                </button>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>

    );

}
export default ReviewManagement