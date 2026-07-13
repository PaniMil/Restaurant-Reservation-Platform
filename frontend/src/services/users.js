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




// import usersData from "../data/users";

// const STORAGE_KEY = "users";

// export function getUsers() {

//     const data = localStorage.getItem(STORAGE_KEY);

//     if (data) {
//         return JSON.parse(data);
//     }

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(usersData)
//     );

//     return usersData;

// }

// export function saveUsers(users) {

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(users)
//     );

// }

// export function deleteUser(id) {

//     const users = getUsers();


//     const updatedUsers = users.filter(
//         (user) => user.id !== id
//     );


//     saveUsers(updatedUsers);

// }

// export function addUser(user) {

//     const users = getUsers();

//     saveUsers([...users, user]);

// }

// export function updateUser(updatedUser) {

//     const users = getUsers();

//     const updatedUsers = users.map((user) => {

//         if (user.id === updatedUser.id) {

//             return updatedUser;

//         }

//         return user;

//     });

//     localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify(updatedUsers)
//     );

// }