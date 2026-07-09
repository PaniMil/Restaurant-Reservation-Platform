import { Link } from "react-router-dom";
import { deleteRestaurant, getRestaurants } from "../services/restaurants";
import { useEffect, useState } from "react";
import EditRestaurantModal from "../components/EditRestaurantModal";

function ManageRestaurants() {

    const [restaurants, setRestaurants] = useState(getRestaurants());

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {

        setRestaurants(getRestaurants());

    }, []);

    function handleDelete(id) {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this restaurant?"
        );


        if (!confirmDelete) {

            return;

        }


        deleteRestaurant(id);


        setRestaurants(getRestaurants());


    }

    return (

        <div className="min-h-screen bg-orange-50 py-10 px-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold text-orange-600">

                        Restaurant Management

                    </h1>

                    <Link

                        to="/admin/restaurants/add"

                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"

                    >

                        + Add Restaurant

                    </Link>

                </div>

                <div className="space-y-5">

                    {restaurants.map((restaurant) => (

                        <div

                            key={restaurant.id}

                            className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"

                        >

                            <div>

                                <h2 className="text-2xl font-semibold">

                                    {restaurant.name}

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    {restaurant.category}

                                </p>

                                <p className="text-gray-500">

                                    {restaurant.city}

                                </p>

                            </div>

                            <div className="flex gap-3">

                                <button

                                    onClick={() => setSelectedRestaurant(restaurant)}

                                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"

                                >

                                    Edit

                                </button>

                                <button

                                    onClick={() => handleDelete(restaurant.id)}

                                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                                >
                                    Delete

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {
                selectedRestaurant && (

                    <EditRestaurantModal

                        restaurant={selectedRestaurant}

                        onClose={() => {
                            setSelectedRestaurant(null);
                            setRestaurants(getRestaurants());
                        }}
                        onUpdate={() =>
                            setRestaurants(getRestaurants())
                        }

                    />

                )
            }

        </div>

    );

}

export default ManageRestaurants;