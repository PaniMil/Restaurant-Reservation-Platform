import { Link } from "react-router-dom";
import { deleteRestaurant, getRestaurants } from "../services/restaurants";
import { useEffect, useState } from "react";
import EditRestaurantModal from "../components/EditRestaurantModal";
import ManageRestaurantCard from "../components/ManageRestaurantCard";


function ManageRestaurants() {

    const [restaurants, setRestaurants] = useState([]);

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    useEffect(() => {

        loadRestaurants();

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

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this restaurant?"
        );

        if (!confirmDelete) return;

        try {

            await deleteRestaurant(id);

            await loadRestaurants();

            alert("Restaurant deleted.");

        }

        catch (err) {

            alert(err.message);

        }

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

                        <ManageRestaurantCard

                            key={restaurant.id}

                            restaurant={restaurant}

                            onEdit={() => setSelectedRestaurant(restaurant)}

                            onDelete={() => handleDelete(restaurant.id)}

                        />

                    ))}

                </div>

            </div>

            {
                selectedRestaurant && (

                    <EditRestaurantModal

                        restaurant={selectedRestaurant}

                        onClose={() => {

                            setSelectedRestaurant(null);

                            loadRestaurants();

                        }}
                        onUpdate={loadRestaurants}

                    />

                )
            }

        </div>

    );

}

export default ManageRestaurants;