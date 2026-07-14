import sql from "../../config/db.js";

export async function getAllRatings() {

    const ratings = await sql`

        SELECT
            ratings.*,
            users.full_name,
            restaurants.name AS restaurant_name

        FROM ratings

        JOIN users
        ON ratings.user_id = users.id

        JOIN restaurants
        ON ratings.restaurant_id = restaurants.id

        ORDER BY ratings.created_at DESC;

    `;

    return ratings;

}

export async function getRestaurantRatings(restaurantId) {

    const ratings = await sql`

        SELECT

            ratings.*,

            users.full_name

        FROM ratings

        JOIN users

        ON ratings.user_id = users.id

        WHERE restaurant_id = ${restaurantId}

        ORDER BY created_at DESC;

    `;

    return ratings;

}

export async function getRatingById(id) {

    const rating = await sql`

        SELECT *

        FROM ratings

        WHERE id = ${id};

    `;

    return rating[0];

}

export async function createRating(data) {

    const {

        reservation_id,
        user_id,
        restaurant_id,
        rating,
        comment

    } = data;

    const result = await sql`

        INSERT INTO ratings(

            reservation_id,
            user_id,
            restaurant_id,
            rating,
            comment

        )

        VALUES(

            ${reservation_id},
            ${user_id},
            ${restaurant_id},
            ${rating},
            ${comment}

        )

        RETURNING *;

    `;

    return result[0];

}

export async function updateRating(id, data) {

    const {

        rating,
        comment

    } = data;

    const result = await sql`

        UPDATE ratings

        SET

            rating=${rating},
            comment=${comment}

        WHERE id=${id}

        RETURNING *;

    `;

    return result[0];

}

export async function deleteRating(id) {

    const result = await sql`

        DELETE FROM ratings

        WHERE id=${id}

        RETURNING *;

    `;

    return result[0];

}