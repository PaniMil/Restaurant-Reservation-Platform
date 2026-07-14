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