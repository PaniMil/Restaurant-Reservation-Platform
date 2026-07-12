import sql from "../../config/db.js";

export async function getUserFavorites(userId) {

    const favorites = await sql`

        SELECT restaurants.*

        FROM favorites

        JOIN restaurants

        ON favorites.restaurant_id = restaurants.id

        WHERE favorites.user_id = ${userId}

        ORDER BY favorites.created_at DESC;

    `;

    return favorites;

}

export async function createFavorite(data) {

    const {

        user_id,
        restaurant_id

    } = data;

    const favorite = await sql`

        INSERT INTO favorites(

            user_id,
            restaurant_id

        )

        VALUES(

            ${user_id},
            ${restaurant_id}

        )

        RETURNING *;

    `;

    return favorite[0];

}

export async function deleteFavorite(userId, restaurantId) {

    const favorite = await sql`

        DELETE FROM favorites

        WHERE user_id = ${userId}

        AND restaurant_id = ${restaurantId}

        RETURNING *;

    `;

    return favorite[0];

}

export async function checkFavorite(userId, restaurantId) {

    const favorite = await sql`

        SELECT *

        FROM favorites

        WHERE user_id = ${userId}

        AND restaurant_id = ${restaurantId};

    `;

    return favorite.length > 0;

}