import API_URL from "./api";

export async function getUsers() {

    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();

}

export async function getUserById(id) {

    const response = await fetch(`${API_URL}/users/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return await response.json();

}

export async function addUser(user) {

    const response = await fetch(`${API_URL}/users`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return await response.json();

}

export async function updateUser(id, user) {

    const response = await fetch(`${API_URL}/users/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    });

    if (!response.ok) {
        throw new Error("Failed to update user");
    }

    return await response.json();

}

export async function deleteUser(id) {

    const response = await fetch(`${API_URL}/users/${id}`, {

        method: "DELETE"

    });

    if (!response.ok) {
        throw new Error("Failed to delete user");
    }

    return await response.json();

}

export async function changePassword(

    id,

    currentPassword,

    newPassword

) {

    const response = await fetch(

        `${API_URL}/users/${id}/password`,

        {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                currentPassword,

                newPassword

            })

        }

    );

    if (!response.ok) {

        const error = await response.json();

        throw new Error(error.message);

    }

    return await response.json();

}

