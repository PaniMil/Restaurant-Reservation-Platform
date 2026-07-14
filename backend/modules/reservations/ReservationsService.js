import sql from "../../config/db.js";

// export async function getAllReservations() {

//     const reservations = await sql`

//         SELECT *

//         FROM reservations

//         ORDER BY id;

//     `;

//     return reservations;

// }
export async function getAllReservations() {

    await sql`

        UPDATE reservations

        SET status = 'completed'

        WHERE

            status = 'upcoming'

            AND (

                reservation_date < CURRENT_DATE

                OR (

                    reservation_date = CURRENT_DATE

                    AND end_time < CURRENT_TIME

                )

            );

    `;

    const reservations = await sql`

        SELECT *

        FROM reservations

        ORDER BY id;

    `;

    return reservations;

}

export async function getReservationById(id) {

    const reservation = await sql`

        SELECT *

        FROM reservations

        WHERE id = ${id};

    `;

    return reservation[0];

}

export async function hasReservationConflict(
    restaurantId,
    reservationDate,
    startTime,
    endTime
) {

    const conflict = await sql`

        SELECT *

        FROM reservations

        WHERE restaurant_id = ${restaurantId}

        AND reservation_date = ${reservationDate}

        AND status != 'cancelled'

        AND (

            start_time < ${endTime}

            AND

            end_time > ${startTime}

        )

    `;

    return conflict.length > 0;

}

export async function createReservation(data) {

    const {

        restaurant_id,
        reservation_date,
        start_time,
        end_time

    } = data;

    const conflict =
        await hasReservationConflict(

            restaurant_id,
            reservation_date,
            start_time,
            end_time

        );

    if (conflict) {

        throw new Error(
            "This time slot is already reserved."
        );

    }

    const {

        user_id,
        guests,
        special_request,
        status

    } = data;

    const reservation = await sql`

        INSERT INTO reservations(

            user_id,
            restaurant_id,
            reservation_date,
            start_time,
            end_time,
            guests,
            special_request,
            status

        )

        VALUES(

            ${user_id},
            ${restaurant_id},
            ${reservation_date},
            ${start_time},
            ${end_time},
            ${guests},
            ${special_request},
            ${status}

        )

        RETURNING *;

    `;

    return reservation[0];

}

// export async function createAReservation(data) {

//     const {

//         user_id,
//         restaurant_id,
//         reservation_date,
//         start_time,
//         end_time,
//         guests,
//         special_request,
//         status

//     } = data;

//     const reservation = await sql`

//         INSERT INTO reservations (

//             user_id,
//             restaurant_id,
//             reservation_date,
//             start_time,
//             end_time,
//             guests,
//             special_request,
//             status

//         )

//         VALUES (

//             ${user_id},
//             ${restaurant_id},
//             ${reservation_date},
//             ${start_time},
//             ${end_time},
//             ${guests},
//             ${special_request},
//             ${status}

//         )

//         RETURNING *;

//     `;

//     return reservation[0];

// }

export async function updateReservation(id, data) {

    const {

        user_id,
        restaurant_id,
        reservation_date,
        start_time,
        end_time,
        guests,
        special_request,
        status

    } = data;

    const reservation = await sql`

        UPDATE reservations

        SET

            user_id = ${user_id},
            restaurant_id = ${restaurant_id},
            reservation_date = ${reservation_date},
            start_time = ${start_time},
            end_time = ${end_time},
            guests = ${guests},
            special_request = ${special_request},
            status = ${status}

        WHERE id = ${id}

        RETURNING *;

    `;

    return reservation[0];

}

export async function deleteReservation(id) {

    const reservation = await sql`

        DELETE FROM reservations

        WHERE id = ${id}

        RETURNING id;

    `;

    return reservation[0];

}

export async function getReservationsByRestaurant(restaurantId, date) {

    const reservations = await sql`

        SELECT *
        FROM reservations

        WHERE restaurant_id = ${restaurantId}
        AND reservation_date = ${date}

        ORDER BY start_time;

    `;

    return reservations;

}