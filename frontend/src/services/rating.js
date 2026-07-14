import API_URL from "./api";

export async function getAllRatings() {

    const response = await fetch(`${API_URL}/ratings`);

    if (!response.ok) {

        throw new Error("Failed to fetch ratings");

    }

    return await response.json();

}

export async function getRatings(restaurantId) {

    const response = await fetch(`${API_URL}/ratings/restaurant/${restaurantId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch ratings");
    }

    return await response.json();

}

export async function addRating(rating) {

    const response = await fetch(`${API_URL}/ratings`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(rating)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data;

}

export async function updateRating(id, rating) {

    const response = await fetch(`${API_URL}/ratings/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(rating)

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data;

}

export async function deleteRating(id) {

    const response = await fetch(`${API_URL}/ratings/${id}`, {

        method: "DELETE"

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data;

}
