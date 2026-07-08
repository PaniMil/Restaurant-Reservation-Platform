import { useParams } from "react-router-dom";
import restaurants from "../data/restaurants";

function RestaurantDetails() {

    const { id } = useParams();

    const restaurant = restaurants.find(
        (r) => r.id === Number(id)
    )

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
                        {restaurant.openingHours}
                    </p>

                </div>

                <button
                    className="mt-10 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg transition duration-300"
                >
                    Reserve Table
                </button>

            </div>

        </div>

    </div>
);
}

export default RestaurantDetails;