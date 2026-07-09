import usersData from "../data/users";

const STORAGE_KEY = "users";

export function getUsers() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(usersData)
    );

    return usersData;

}

export function saveUsers(users) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(users)
    );

}

export function addUser(user) {

    const users = getUsers();

    saveUsers([...users, user]);

}

export function updateUser(updatedUser) {

    const users = getUsers();

    const updatedUsers = users.map((user) => {

        if (user.id === updatedUser.id) {

            return updatedUser;

        }

        return user;

    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedUsers)
    );

}