import API_URL from "./api";

export async function getReservations() {

    const response = await fetch(`${API_URL}/reservations`);

    if (!response.ok) {

        throw new Error("Failed to fetch reservations");

    }

    return await response.json();

}

export async function getRestaurantReservations(restaurantId, date) {

    const response = await fetch(

        `${API_URL}/reservations/restaurant?restaurantId=${restaurantId}&date=${date}`

    );

    if (!response.ok) {

        throw new Error("Failed to fetch restaurant reservations");

    }

    return await response.json();

}

export async function createReservation(reservation) {

    const response = await fetch(

        `${API_URL}/reservations`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(reservation)

        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data;

}

export async function updateReservation(id, reservation) {

    const response = await fetch(

        `${API_URL}/reservations/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(reservation)

        }

    );

    if (!response.ok) {

        throw new Error("Failed to update reservation");

    }

    return await response.json();

}

export async function deleteReservation(id) {

    const response = await fetch(

        `${API_URL}/reservations/${id}`,

        {

            method: "DELETE"

        }

    );

    if (!response.ok) {

        throw new Error("Failed to delete reservation");

    }

    return await response.json();

}

















// import reservationData from "../data/reservations";


// const STORAGE_KEY = "reservations";

// export function getReservations() {

//     const data = localStorage.getItem(STORAGE_KEY);

//     if (data) {
//         return JSON.parse(data);
//     }

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(reservationData)
//     );

//     return reservationData;

// }

// export function saveReservations(reservations) {

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(reservations)
//     );

// }

// export function addReservation(reservation) {

//     const reservations = getReservations();


//     const updatedReservations = [...reservations, reservation];

//     saveReservations(updatedReservations);

// }

// export function cancelReservation(id) {

//     const reservations = getReservations();

//     const updatedReservations = reservations.map((reservation) => {

//         if (reservation.id === id) {

//             return {
//                 ...reservation,
//                 cancelled: true
//             };

//         }

//         return reservation;

//     });


//     saveReservations(updatedReservations);

// }