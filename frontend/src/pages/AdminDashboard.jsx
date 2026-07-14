import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getRestaurants } from "../services/restaurants";
import { getUsers } from "../services/users";
import { getReservations } from "../services/reservation";
import { getAllRatings } from "../services/rating";

import DashboardStatCard from "../components/DashboardStatCard";
import DashboardMenuCard from "../components/DashboardMenuCard";

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

                    <DashboardStatCard

                        title="Restaurants"

                        value={restaurantCount}

                    />

                    <DashboardStatCard

                        title="Users"

                        value={userCount}

                    />

                    <DashboardStatCard

                        title="Reservations"

                        value={reservationCount}

                    />

                    <DashboardStatCard

                        title="Reviews"

                        value={reviewCount}

                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">

                    {cards.map((card) => (

                        <DashboardMenuCard

                            key={card.title}

                            title={card.title}

                            path={card.path}

                        />

                    ))}

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;