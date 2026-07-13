// import restaurants from "../data/restaurants";
// import reservations from "../data/reservations";
import { getRestaurants } from "../services/restaurants";
import {
    getReservations,
    updateReservation
} from "../services/reservation";
import { useEffect, useState } from "react";
import RatingModal from "../components/RatingModal";
import ReservationCard from "../components/ReservationCard";
import { getCurrentUser } from "../services/auth";

function MyReservations() {

    const restaurants = getRestaurants();

    const currentUser = getCurrentUser();

    const [reservations, setReservations] = useState([]);

    const [selectedReservation, setSelectedReservation] = useState([]);

    useEffect(() => {

        loadReservations();

    }, []);

    async function loadReservations() {

        try {

            const data = await getReservations();

            const userReservations = data.filter(

                reservation => reservation.user_id === currentUser.id

            );

            setReservations(userReservations);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function handleCancel(reservation) {

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

            console.log(err);

        }

    }

    function openRating(reservation) {
        setSelectedReservation(reservation);
    }

    function getReservationStatus(reservation) {

        const now = new Date();

        const reservationDate = new Date(
            `${reservation.reservation_date}T${reservation.end_time}`
        );

        if (reservation.status === "cancelled") {

            return "Cancelled";

        }

        if (reservation.status === "completed") {

            return "Completed";

        }

        return "Upcoming";

        if (reservationDate < now) {
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

        <div className="min-h-screen bg-orange-50 py-10 px-6">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold text-orange-600 mb-8">

                    My Reservations

                </h1>

                {reservations.length === 0 ? (

                    <div className="bg-white rounded-xl shadow-md p-8 text-center">

                        <p className="text-gray-500 text-lg">

                            You don't have any reservations yet.

                        </p>

                    </div>

                ) : (

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

                                    {status === "Upcoming" && (

                                        <button
                                            onClick={() => handleCancel(reservation)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                                        >
                                            Cancel Reservation
                                        </button>

                                    )}

                                    {status === "Completed" && (

                                        <button
                                            onClick={() => openRating(reservation)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
                                        >
                                            ⭐ Rate Restaurant
                                        </button>

                                    )}

                                    {status === "Cancelled" && (

                                        <p className="text-red-600 font-semibold">
                                            Reservation Cancelled
                                        </p>

                                    )}

                                </ReservationCard>

                            );

                        })}

                    </div>

                )}

            </div>

            {
                selectedReservation && (

                    <RatingModal
                        reservation={selectedReservation}
                        onClose={() => setSelectedReservation(null)}
                    />

                )
            }
        </div>

    );

}

export default MyReservations;