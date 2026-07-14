import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRestaurantById } from "../services/restaurants";

import {
    createReservation,
    getRestaurantReservations
} from "../services/reservation";

import { getCurrentUser } from "../services/auth";

function Reservation() {

    const { id } = useParams();

    const currentUser = getCurrentUser();

    const [restaurant, setRestaurant] = useState(null);

    const [reservations, setReservations] = useState([]);

    const [date, setDate] = useState("");

    const [startTime, setStartTime] = useState("");

    const [endTime, setEndTime] = useState("");

    const [guests, setGuests] = useState(2);

    const [request, setRequest] = useState("");



    useEffect(() => {

        loadRestaurant();

    }, [id]);



    useEffect(() => {

        if (restaurant && date) {

            loadReservations();

        }

    }, [restaurant, date]);



    async function loadRestaurant() {

        try {

            const data = await getRestaurantById(id);

            setRestaurant(data);

        }

        catch (err) {

            console.log(err);

        }

    }



    async function loadReservations() {

        try {

            const data = await getRestaurantReservations(

                restaurant.id,

                date

            );

            setReservations(data);

        }

        catch (err) {

            console.log(err);

        }

    }



    function generateTimeSlots() {

        if (!restaurant) return [];

        const slots = [];

        const interval = restaurant.reservation_interval;

        const [openHour, openMinute] =
            restaurant.opening_time.split(":").map(Number);

        const [closeHour, closeMinute] =
            restaurant.closing_time.split(":").map(Number);

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

        const [hour, minute] =

            time.substring(0, 5).split(":").map(Number);

        return hour * 60 + minute;

    }



    function isTimeAvailable(start, end) {

        const newStart = convertToMinutes(start);

        const newEnd = convertToMinutes(end);

        return !reservations.some((reservation) => {

            const reservedStart =

                convertToMinutes(reservation.start_time);

            const reservedEnd =

                convertToMinutes(reservation.end_time);

            return (

                newStart < reservedEnd &&

                newEnd > reservedStart &&

                reservation.status !== "cancelled"

            );

        });

    }



    const endTimeOptions = timeSlots.filter((slot) => {

        if (!startTime) return false;

        const difference =

            convertToMinutes(slot) -

            convertToMinutes(startTime);

        if (

            difference < restaurant.minimum_reservation_minutes ||

            difference > restaurant.maximum_reservation_minutes

        ) {

            return false;

        }

        return isTimeAvailable(startTime, slot);

    });



    async function handleReservation() {

        if (!currentUser) {

            alert("Please login first.");

            return;

        }

        if (!date || !startTime || !endTime) {

            alert("Please select date, start time and end time.");

            return;

        }

        try {

            await createReservation({

                user_id: currentUser.id,

                restaurant_id: restaurant.id,

                reservation_date: date,

                start_time: startTime,

                end_time: endTime,

                guests,

                special_request: request,

                status: "upcoming"

            });

            await loadReservations();

            alert("Reservation confirmed!");

            setDate("");

            setStartTime("");

            setEndTime("");

            setGuests(2);

            setRequest("");

        }

        catch (err) {

            alert(err.message);

        }

    }



    if (!restaurant) {

        return <h1 className="text-center mt-20">Loading...</h1>;

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

                        {restaurant.opening_time} - {restaurant.closing_time}

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

                        }}

                        className="w-full border rounded-lg px-4 py-3"

                    />

                </div>

                <div className="mt-8">

                    <label className="block mb-3 font-medium">

                        Select Start Time

                    </label>

                    <div className="flex flex-wrap gap-3">

                        {

                            timeSlots.map((slot) => {

                                const reserved = reservations.some(

                                    reservation =>

                                        reservation.start_time.substring(0, 5) === slot &&

                                        reservation.status !== "cancelled"

                                );

                                return (

                                    <button

                                        key={slot}

                                        disabled={reserved}

                                        onClick={() => {

                                            setStartTime(slot);

                                            setEndTime("");

                                        }}

                                        className={`

                                    px-4 py-2 rounded-lg border transition

                                    ${reserved

                                                ? "bg-red-100 text-red-500 cursor-not-allowed"

                                                : startTime === slot

                                                    ? "bg-orange-500 text-white"

                                                    : "bg-white hover:bg-orange-100"

                                            }

                                    `}

                                    >

                                        {slot}

                                    </button>

                                );

                            })

                        }

                    </div>

                </div>

                <div className="mt-8">

                    <label className="block mb-3 font-medium">

                        Select End Time

                    </label>

                    <div className="flex flex-wrap gap-3">

                        {

                            endTimeOptions.map((slot) => (

                                <button

                                    key={slot}

                                    onClick={() => setEndTime(slot)}

                                    className={`

                                px-4 py-2 rounded-lg border transition

                                ${endTime === slot

                                            ? "bg-orange-500 text-white"

                                            : "bg-white hover:bg-orange-100"

                                        }

                                `}

                                >

                                    {slot}

                                </button>

                            ))

                        }

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

                <button

                    onClick={handleReservation}

                    disabled={!date || !startTime || !endTime}

                    className={`

                mt-8 w-full py-4 rounded-lg text-white transition

                ${!date || !startTime || !endTime

                            ? "bg-gray-400 cursor-not-allowed"

                            : "bg-orange-500 hover:bg-orange-600"

                        }

                `}

                >

                    Confirm Reservation

                </button>

            </div>

        </div>

    );

}

export default Reservation;
