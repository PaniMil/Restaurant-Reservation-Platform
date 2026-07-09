import restaurants from "../data/restaurants";
// import reservations from "../data/reservations";
import { getReservations, cancelReservation } from "../services/reservation";
import { useState } from "react";
import RatingModal from "../components/RatingModal";

function MyReservations() {

    const [reservations, setReservations] = useState(getReservations());

    const [selectedReservation, setSelectedReservation] = useState(null);

    function handleCancel(id) {

        cancelReservation(id);

        setReservations(getReservations());

        alert("Reservation cancelled.");

    }

    function openRating(reservation) {
        setSelectedReservation(reservation);
    }

    function getReservationStatus(reservation) {

        const now = new Date();

        const reservationDate = new Date(
            `${reservation.date}T${reservation.endTime}`
        );

        if (reservation.cancelled) {
            return "Cancelled";
        }

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

                                    restaurant.id === reservation.restaurantId

                            );

                            const status = getReservationStatus(reservation);

                            const statusColor = getStatusColor(status);

                            return (

                                <div
                                    key={reservation.id}
                                    className="bg-white rounded-xl shadow-md p-6"
                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h2 className="text-2xl font-semibold">

                                                {restaurant.name}

                                            </h2>

                                            <div
                                                className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${statusColor}`}
                                            >

                                                {status}

                                            </div>

                                            <p className="text-gray-600 mt-2">

                                                📅 {reservation.date}

                                            </p>

                                            <p className="text-gray-600">

                                                🕒 {reservation.startTime} - {reservation.endTime}

                                            </p>

                                            <p className="text-gray-600">

                                                👥 {reservation.guests} Guests

                                            </p>

                                            {reservation.request && (

                                                <p className="text-gray-600">

                                                    📝 {reservation.request}

                                                </p>

                                            )}

                                        </div>
                                        <div>

                                            {status === "Upcoming" && (

                                                <button

                                                    onClick={() => handleCancel(reservation.id)}

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

                                        </div>

                                    </div>

                                </div>

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