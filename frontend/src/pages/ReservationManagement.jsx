import { useState } from "react";
import { getRestaurants } from "../services/restaurants";
import { getReservations, cancelReservation } from "../services/reservation";
import ReservationCard from "../components/ReservationCard";

function ReservationManagement() {

    const [reservations, setReservations] = useState(getReservations());

    const restaurants = getRestaurants();

    function handleCancel(id) {

        const confirmDelete = window.confirm(
            "Cancel this reservation?"
        );

        if (!confirmDelete) {
            return;
        }

        cancelReservation(id);

        setReservations(getReservations());

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

    console.log(reservations);

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

                                restaurant.id === reservation.restaurantId

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

                                        onClick={() => handleCancel(reservation.id)}

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