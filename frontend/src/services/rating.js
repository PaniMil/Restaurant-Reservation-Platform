import API_URL from "./api";

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

    return await response.json();

}

export async function updateRating(id, rating) {

    const response = await fetch(`${API_URL}/ratings/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(rating)

    });

    return await response.json();

}

export async function deleteRating(id) {

    const response = await fetch(`${API_URL}/ratings/${id}`, {

        method: "DELETE"

    });

    return await response.json();

}













// const STORAGE_KEY = "ratings";


// export function getRatings(){

//     const data = localStorage.getItem(STORAGE_KEY);

//     return data ? JSON.parse(data) : [];

// }



// export function addRating(rating){

//     const ratings = getRatings();

//     const updatedRatings = [
//         ...ratings,
//         rating
//     ];

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(updatedRatings)
//     );

// }

// export function deleteRating(id) {

//     const ratings = getRatings();

//     const updatedRatings = ratings.filter((rating) => {

//         return rating.id !== id;

//     });

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(updatedRatings)
//     );

// }