import { useEffect, useState } from "react";

import { getRestaurants } from "../services/restaurants";

import { getReservations, updateReservation } from "../services/reservation";

import ReservationCard from "../components/ReservationCard";

function ReservationManagement() {

    const [restaurants, setRestaurants] = useState([]);

    const [reservations, setReservations] = useState([]);

    useEffect(() => {

        loadRestaurants();

        loadReservations();

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

    async function loadReservations() {

        try {

            const data = await getReservations();

            setReservations(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function handleCancel(reservation) {

        const confirmDelete = window.confirm(
            "Cancel this reservation?"
        );

        if (!confirmDelete) return;

        try {

            await updateReservation(

                reservation.id,

                {

                    ...reservation,

                    status: "cancelled"

                }

            );

            await loadReservations();

            alert("Reservation cancelled.");

        }

        catch (err) {

            alert(err.message);

        }

    }

    function getReservationStatus(reservation) {

        if (reservation.status === "cancelled") {

            return "Cancelled";

        }

        if (reservation.status === "completed") {

            return "Completed";

        }

        return "Upcoming";

    }

    function getStatusColor(status) {

        switch (status) {

            case "Upcoming":
                return "bg-green-100 text-green-700";

            case "Completed":
                return "bg-blue-100 text-blue-700";

            case "Cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "";

        }

    }

    return (

        <div className="min-h-screen bg-orange-50 py-10 px-8">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-orange-600 mb-8">

                    Reservation Management

                </h1>

                <div className="space-y-6">

                    {reservations.map((reservation) => {

                        const restaurant = restaurants.find(

                            (restaurant) =>

                                restaurant.id === reservation.restaurant_id

                        );

                        const status = getReservationStatus(reservation);

                        const statusColor = getStatusColor(status);

                        return (

                            <ReservationCard
                                key={reservation.id}
                                reservation={reservation}
                                restaurant={restaurant}
                                status={status}
                                statusColor={statusColor}
                            >

                                {status === "Upcoming" ? (

                                    <button

                                        onClick={() => handleCancel(reservation)}

                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                                    >

                                        Cancel Reservation

                                    </button>

                                ) : (

                                    <p className="text-gray-500">

                                        No Actions

                                    </p>

                                )}

                            </ReservationCard>

                        );

                    })}

                </div>

            </div>

        </div>

    );

}

export default ReservationManagement;