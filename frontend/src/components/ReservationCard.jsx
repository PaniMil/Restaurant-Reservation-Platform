function ReservationCard({
    reservation,
    restaurant,
    status,
    statusColor,
    children
}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-semibold">
                        {restaurant.name}
                    </h2>

                    {reservation.username && (

                        <p className="text-gray-500 mt-2">

                            👤 (@{reservation.username})

                        </p>

                    )}

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

                    {children}

                </div>

            </div>

        </div>

    );

}

export default ReservationCard;