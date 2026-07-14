import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getRestaurants } from "../services/restaurants";
import { getUsers } from "../services/users";
import { getReservations } from "../services/reservation";
import { getAllRatings } from "../services/rating";


function AdminDashboard() {

    const [restaurantCount, setRestaurantCount] = useState(0);

    const [userCount, setUserCount] = useState(0);

    const [reservationCount, setReservationCount] = useState(0);

    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const restaurants = await getRestaurants();

            const users = await getUsers();

            const reservations = await getReservations();

            const ratings = await getAllRatings();

            setRestaurantCount(restaurants.length);

            setUserCount(

                users.filter(

                    user => user.role !== "admin"

                ).length

            );

            setReservationCount(reservations.length);

            setReviewCount(ratings.length);

        }

        catch (err) {

            console.log(err);

        }

    }

    const cards = [

        {
            title: "Restaurant Management",
            path: "/admin/restaurants"
        },

        {
            title: "User Management",
            path: "/admin/users"
        },

        {
            title: "Reservation Management",
            path: "/admin/reservations"
        },

        {
            title: "Review Management",
            path: "/admin/reviews"
        }

    ];

    return (

        <div className="min-h-screen bg-orange-50 py-10 px-8">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-bold text-orange-600">

                    Admin Dashboard

                </h1>

                <p className="text-gray-500 mt-2">

                    Welcome Admin

                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">

                        <p className="text-gray-500">

                            Restaurants

                        </p>

                        <h2 className="text-4xl font-bold text-orange-600 mt-2">

                            {restaurantCount}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">

                        <p className="text-gray-500">

                            Users

                        </p>

                        <h2 className="text-4xl font-bold text-orange-600 mt-2">

                            {userCount}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">

                        <p className="text-gray-500">

                            Reservations

                        </p>

                        <h2 className="text-4xl font-bold text-orange-600 mt-2">

                            {reservationCount}

                        </h2>

                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 text-center">

                        <p className="text-gray-500">

                            Reviews

                        </p>

                        <h2 className="text-4xl font-bold text-orange-600 mt-2">

                            {reviewCount}

                        </h2>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

                    {cards.map((card) => (

                        <Link

                            key={card.title}

                            to={card.path}

                            className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition"

                        >

                            <h2 className="text-2xl font-semibold text-gray-800">

                                {card.title}

                            </h2>

                        </Link>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;