import API_URL from "./api";

export async function getRestaurants() {

    const response = await fetch(`${API_URL}/restaurants`);

    if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
    }

    return await response.json();

}

export async function getRestaurantById(id) {

    const response = await fetch(`${API_URL}/restaurants/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
    }

    return await response.json();

}

export async function addRestaurant(restaurant) {

    const response = await fetch(`${API_URL}/restaurants`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(restaurant)

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;

}

export async function updateRestaurant(id, restaurant) {

    const response = await fetch(`${API_URL}/restaurants/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(restaurant)

    });

    if (!response.ok) {
        throw new Error("Failed to update restaurant");
    }

    return await response.json();

}

export async function deleteRestaurant(id) {

    const response = await fetch(`${API_URL}/restaurants/${id}`, {

        method: "DELETE"

    });

    if (!response.ok) {
        throw new Error("Failed to delete restaurant");
    }

    return await response.json();

}

