import { useParams } from "react-router-dom";
import { useState } from "react";
import restaurants from "../data/restaurants";
// import reservations from "../data/reservations";
import { getReservations, addReservation } from "../services/reservation";// import { getReservations, saveReservations } from "../services/reservation";

function Reservation() {

    const { id } = useParams();

    const [date, setDate] = useState("");

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [guests, setGuests] = useState(2);

    const [request, setRequest] = useState("");

    const restaurant = restaurants.find(
        (restaurant) => restaurant.id === Number(id)
    );

    const reservations = getReservations();

    const restaurantReservations = reservations.filter((reservation) => {

        return (

            reservation.restaurantId === restaurant.id &&
            reservation.date === date

        );

    });

    function generateTimeSlots() {

        const slots = [];

        const interval = restaurant.reservationInterval;

        const [openHour, openMinute] =
            restaurant.openingTime.split(":").map(Number);

        const [closeHour, closeMinute] =
            restaurant.closingTime.split(":").map(Number);

        const current = new Date();

        current.setHours(openHour);
        current.setMinutes(openMinute);
        current.setSeconds(0);

        const end = new Date();

        end.setHours(closeHour);
        end.setMinutes(closeMinute);
        end.setSeconds(0);

        while (current < end) {

            slots.push(

                current.toLocaleTimeString([], {

                    hour: "2-digit",

                    minute: "2-digit",

                    hour12: false

                })

            );

            current.setMinutes(

                current.getMinutes() + interval

            );

        }

        return slots;

    }

    const timeSlots = generateTimeSlots();

    function convertToMinutes(time) {

        const [hour, minute] = time.split(":").map(Number);

        return hour * 60 + minute;

    }

    ///////////////////////////////////////////////////////
    function isTimeAvailable(start, end) {

        const newStart = convertToMinutes(start);

        const newEnd = convertToMinutes(end);


        return !restaurantReservations.some((reservation) => {

            const reservedStart = convertToMinutes(
                reservation.startTime
            );

            const reservedEnd = convertToMinutes(
                reservation.endTime
            );


            return (
                newStart < reservedEnd &&
                newEnd > reservedStart
            );

        });

    }
    ////////////////////////////////////////////////////////

    const endTimeOptions = timeSlots.filter((slot) => {

        if (!startTime) return false;


        const difference =
            convertToMinutes(slot) -
            convertToMinutes(startTime);


        if (
            difference < restaurant.minimumReservationMinutes ||
            difference > restaurant.maximumReservationMinutes
        ) {
            return false;
        }


        return isTimeAvailable(startTime, slot);

    });
    // const endTimeOptions = timeSlots.filter((slot) => {

    //     if (!startTime) return false;

    //     const difference =
    //         convertToMinutes(slot) -
    //         convertToMinutes(startTime);

    //     return (

    //         difference >= restaurant.minimumReservationMinutes &&

    //         difference <= restaurant.maximumReservationMinutes

    //     );

    // });

    function handleReservation() {

        if (!date || !startTime || !endTime) {

            alert("Please select date, start time and end time.");

            return;

        }


        const newReservation = {

            id: Date.now(),

            restaurantId: restaurant.id,

            date: date,

            startTime: startTime,

            endTime: endTime,

            guests: guests,

            request: request,

            cancelled: false

        };


        addReservation(newReservation);


        alert("Reservation confirmed!");


        setStartTime("");

        setEndTime("");

        setGuests(2);

        setRequest("");

        setDate("");

    }

    return (

        <div className="min-h-screen bg-orange-50 py-10 px-6">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">

                <h1 className="text-4xl font-bold text-orange-600">
                    Reserve Table
                </h1>

                <p className="text-gray-500 mt-2">
                    Restaurant
                </p>

                <h2 className="text-2xl font-semibold">
                    {restaurant.name}
                </h2>

                <div className="mt-5">

                    <p className="text-gray-500">

                        Opening Hours

                    </p>

                    <h3 className="text-lg font-semibold">

                        {restaurant.openingTime} - {restaurant.closingTime}

                    </h3>

                </div>

                <div className="mt-8">

                    <label className="block mb-2 font-medium">

                        Date

                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => {

                            setDate(e.target.value);

                            setStartTime("");

                            setEndTime("");

                        }} className="w-full border rounded-lg px-4 py-3"
                    />

                </div>


                <div className="mt-8">

                    <label className="block mb-3 font-medium">

                        Select Start Time

                    </label>

                    <div className="flex flex-wrap gap-3">

                        {timeSlots.map((slot) => {

                            const reserved = restaurantReservations.some(

                                (reservation) =>

                                    reservation.startTime === slot

                            );

                            return (

                                <button

                                    key={slot}

                                    disabled={reserved}

                                    onClick={() => { setStartTime(slot); setEndTime(""); }}

                                    className={` px-4 py-2 rounded-lg border transition ${reserved ? "bg-red-100 text-red-500 cursor-not-allowed"
                                        : startTime === slot ? "bg-orange-500 text-white"
                                            : "bg-white hover:bg-orange-100"} `}>

                                    {slot}

                                </button>

                            );

                        })}

                    </div>

                </div>

                <div className="mt-8">

                    <label className="block mb-3 font-medium">

                        Select End Time

                    </label>

                    <div className="flex flex-wrap gap-3">

                        {endTimeOptions.map((slot) => (

                            <button

                                key={slot}

                                onClick={() => setEndTime(slot)}

                                className={` px-4 py-2 rounded-lg border transition ${endTime === slot ? "bg-orange-500 text-white" : "bg-white hover:bg-orange-100"}`}

                            >
                                {slot}

                            </button>

                        ))}

                    </div>

                </div>

                <div className="mt-6">

                    <label className="block mb-2 font-medium">

                        Number of Guests

                    </label>

                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full border rounded-lg px-4 py-3"
                    />

                </div>

                <div className="mt-6">

                    <label className="block mb-2 font-medium">

                        Special Request

                    </label>

                    <textarea
                        rows="4"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                        placeholder="Any special request..."
                    />

                </div>

                {/* <button
                    className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg transition duration-300"
                >

                    Confirm Reservation

                </button> */}

                <button

                    onClick={handleReservation}

                    disabled={!date || !startTime || !endTime}

                    className={` mt-8 w-full py-4 rounded-lg transition text-white  ${!date || !startTime || !endTime

                        ? "bg-gray-400 cursor-not-allowed"

                        : "bg-orange-500 hover:bg-orange-600"

                        }`}

                >

                    Confirm Reservation

                </button>

            </div>

        </div>

    );

}

export default Reservation;