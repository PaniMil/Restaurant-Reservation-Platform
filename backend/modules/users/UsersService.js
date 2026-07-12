import sql from "../../config/db.js";

export async function getAllUsers() {

    const users = await sql`

        SELECT
            id,
            full_name,
            username,
            email,
            role,
            created_at
        FROM users
        ORDER BY id;

    `;

    return users;

}

export async function getUserById(id) {

    const user = await sql`

        SELECT
            id,
            full_name,
            username,
            email,
            role,
            created_at
        FROM users
        WHERE id = ${id};

    `;

    return user[0];

}

export async function createAUser(data) {

    const {
        full_name,
        username,
        email,
        password
    } = data;

    const user = await sql`

        INSERT INTO users (

            full_name,
            username,
            email,
            password

        )

        VALUES (

            ${full_name},
            ${username},
            ${email},
            ${password}

        )

        RETURNING

            id,
            full_name,
            username,
            email,
            role,
            created_at;

    `;

    return user[0];

}

export async function updateUser(id, data) {

    const {
        full_name,
        username,
        email,
        password
    } = data;

    const user = await sql`

        UPDATE users

        SET

            full_name = ${full_name},
            username = ${username},
            email = ${email},
            password = ${password}

        WHERE id = ${id}

        RETURNING

            id,
            full_name,
            username,
            email,
            role,
            created_at;

    `;

    return user[0];

}

export async function deleteUser(id) {

    const user = await sql`

        DELETE FROM users

        WHERE id = ${id}

        RETURNING id;

    `;

    return user[0];

}



// import { sql } from "../../config/db.js";

// export async function getAllUsers() {

//     const users = await sql`
//         SELECT *
//         FROM users
//         ORDER BY id;
//     `;

//     return users;

// }

// export async function getUserById(id) {

//     const user = await sql`
//         SELECT *
//         FROM users
//         WHERE id = ${id};
//     `;

//     return user[0];

// }

// export async function createAUser(data) {

//     const {
//         full_name,
//         username,
//         email,
//         password
//     } = data;

//     const user = await sql`

//         INSERT INTO users(

//             full_name,
//             username,
//             email,
//             password

//         )

//         VALUES(

//             ${full_name},
//             ${username},
//             ${email},
//             ${password}

//         )

//         RETURNING *;

//     `;

//     return user[0];

// }

// export async function updateUser(id, data) {

//     const {

//         full_name,
//         username,
//         email,
//         password

//     } = data;

//     const user = await sql`

//         UPDATE users

//         SET

//             full_name = ${full_name},
//             username = ${username},
//             email = ${email},
//             password = ${password}

//         WHERE id = ${id}

//         RETURNING *;

//     `;

//     return user[0];

// }

// export async function deleteUser(id) {

//     const user = await sql`

//         DELETE FROM users

//         WHERE id = ${id}

//         RETURNING *;

//     `;

//     return user[0];

// }