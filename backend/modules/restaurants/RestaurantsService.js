import sql from "../../config/db.js";

export async function getAllRestaurants() {

    const restaurants = await sql`
        SELECT *
        FROM restaurants
        ORDER BY id;
    `;

    return restaurants;
}

export async function getRestaurantById(id) {

    const restaurant = await sql`
        SELECT *
        FROM restaurants
        WHERE id = ${id};
    `;

    return restaurant[0];

}

export async function createARestaurant(data) {

    const {
        name,
        category,
        city,
        description,
        image_url,
        tables,
        opening_time,
        closing_time,
        reservation_interval,
        minimum_reservation_minutes,
        maximum_reservation_minutes
    } = data;

    const restaurant = await sql`

        INSERT INTO restaurants (

            name,
            category,
            city,
            description,
            image_url,
            tables,
            opening_time,
            closing_time,
            reservation_interval,
            minimum_reservation_minutes,
            maximum_reservation_minutes

        )

        VALUES (

            ${name},
            ${category},
            ${city},
            ${description},
            ${image_url},
            ${tables},
            ${opening_time},
            ${closing_time},
            ${reservation_interval},
            ${minimum_reservation_minutes},
            ${maximum_reservation_minutes}

        )

        RETURNING *;

    `;

    return restaurant[0];

}

export async function updateRestaurant(id, data) {

    const {
        name,
        category,
        city,
        description,
        image_url,
        tables,
        opening_time,
        closing_time,
        reservation_interval,
        minimum_reservation_minutes,
        maximum_reservation_minutes
    } = data;

    const restaurant = await sql`

        UPDATE restaurants

        SET

            name = ${name},
            category = ${category},
            city = ${city},
            description = ${description},
            image_url = ${image_url},
            tables = ${tables},
            opening_time = ${opening_time},
            closing_time = ${closing_time},
            reservation_interval = ${reservation_interval},
            minimum_reservation_minutes = ${minimum_reservation_minutes},
            maximum_reservation_minutes = ${maximum_reservation_minutes}

        WHERE id = ${id}

        RETURNING *;

    `;

    return restaurant[0];

}

export async function deleteRestaurant(id) {

    const restaurant = await sql`

        DELETE FROM restaurants

        WHERE id = ${id}

        RETURNING *;

    `;

    return restaurant[0];

}