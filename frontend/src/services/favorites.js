import API_URL from "./api";

export async function getFavorites(userId) {

    const response = await fetch(
        `${API_URL}/favorites/${userId}`
    );

    if (!response.ok) {

        throw new Error("Failed to fetch favorites");

    }

    return await response.json();

}

export async function addFavorite(userId, restaurantId) {

    const response = await fetch(
        `${API_URL}/favorites`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user_id: userId,
                restaurant_id: restaurantId

            })

        }
    );

    return await response.json();

}

export async function removeFavorite(userId, restaurantId) {

    const response = await fetch(
        `${API_URL}/favorites`,
        {

            method: "DELETE",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                user_id: userId,
                restaurant_id: restaurantId

            })

        }
    );

    return await response.json();

}
// export async function removeFavorite(userId) {

//     const response = await fetch(
//         `${API_URL}/favorites/${id}`,
//         {

//             method: "DELETE"

//         }
//     );

//     return await response.json();

// }



// export function getFavorites() {
//     const data = localStorage.getItem("favorites");

//     return data ? JSON.parse(data) : [];
// }

// export function saveFavorites(favorites) {
//     localStorage.setItem(
//         "favorites",
//         JSON.stringify(favorites)
//     );
// }