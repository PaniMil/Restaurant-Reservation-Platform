import API_URL from "./api";

export async function login(username, password) {

    const response = await fetch(

        `${API_URL}/users/login`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,
                password

            })

        }

    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(data.message);

    }

    localStorage.setItem(

        "currentUser",

        JSON.stringify(data)

    );

    return data;

}

export function logout() {

    localStorage.removeItem("currentUser");

}

export function getCurrentUser() {

    const data = localStorage.getItem("currentUser");

    return data ? JSON.parse(data) : null;

}

export function updateCurrentUser(user) {

    localStorage.setItem(

        "currentUser",

        JSON.stringify(user)

    );

}
