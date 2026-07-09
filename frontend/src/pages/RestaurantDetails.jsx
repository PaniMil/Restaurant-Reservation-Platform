import { useParams } from "react-router-dom";
// import restaurants from "../data/restaurants";
import { getRestaurants } from "../services/restaurants";
import { Link } from "react-router-dom";
import { getRatings } from "../services/rating";
import { useState } from "react";

function RestaurantDetails() {

    const { id } = useParams();

    const restaurants = getRestaurants();

    const restaurant = restaurants.find(
        (r) => r.id === Number(id)
    )

    const ratings = getRatings();


    const restaurantRatings = ratings.filter(
        (rating) =>
            rating.restaurantId === restaurant.id
    );


    const averageRating =
        restaurantRatings.length > 0
            ?
            (
                restaurantRatings.reduce(
                    (sum, item) => sum + item.rating,
                    0
                )
                /
                restaurantRatings.length
            ).toFixed(1)
            :
            "No ratings";

    return (
        <div className="min-h-screen bg-orange-50 py-12 px-6">

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

                <div className="h-72 bg-gray-300 flex items-center justify-center">

                    <p className="text-gray-600 text-xl">
                        Restaurant Image
                    </p>

                </div>

                <div className="p-8">

                    <h1 className="text-4xl font-bold text-gray-800">
                        {restaurant.name}
                    </h1>

                    <p className="mt-3 text-orange-600 text-lg">
                        ⭐ {restaurant.rating}
                    </p>

                    <div className="mt-4">

                        <p className="text-lg font-semibold">
                            Customer Rating
                        </p>

                        <p className="text-orange-600 text-xl mt-2">
                            ⭐ {averageRating}
                        </p>

                        <p className="text-gray-500">
                            {restaurantRatings.length} reviews
                        </p>

                    </div>

                    <p className="mt-2 text-gray-600">
                        {restaurant.category} • {restaurant.city}
                    </p>

                    <p className="mt-2 text-gray-600">
                        {restaurant.tables} Tables Available
                    </p>

                    <div className="mt-8">

                        <h2 className="text-2xl font-semibold">
                            Description
                        </h2>

                        <p className="mt-3 text-gray-600 leading-7">
                            {restaurant.description}
                        </p>

                    </div>

                    <div className="mt-8">

                        <h2 className="text-2xl font-semibold">
                            Opening Hours
                        </h2>

                        <p className="mt-3 text-gray-600">
                            {restaurant.openingTime} - {restaurant.closingTime}                        </p>

                    </div>

                    <div className="mt-10">

                        <h2 className="text-2xl font-semibold">
                            Customer Reviews
                        </h2>


                        {
                            restaurantRatings.length === 0 ? (

                                <p className="text-gray-500 mt-4">
                                    No reviews yet.
                                </p>

                            ) : (

                                <div className="space-y-4 mt-5">

                                    {
                                        restaurantRatings.map((item) => (

                                            <div
                                                key={item.id}
                                                className="bg-orange-50 rounded-lg p-4"
                                            >

                                                <p className="text-orange-600">
                                                    {"⭐".repeat(item.rating)}
                                                </p>


                                                {
                                                    item.comment && (

                                                        <p className="text-gray-600 mt-2">
                                                            {item.comment}
                                                        </p>

                                                    )
                                                }


                                            </div>

                                        ))
                                    }

                                </div>

                            )
                        }


                    </div>

                    <Link
                        to={`/restaurant/${restaurant.id}/reserve`}
                        className="block mt-10 w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-4 rounded-lg transition duration-300"
                    >
                        Reserve Table
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default RestaurantDetails;