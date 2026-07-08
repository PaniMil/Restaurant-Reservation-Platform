export function getCurrentUser() {
    const data = localStorage.getItem("currentUser");

    return data ? JSON.parse(data) : null;
}

export function login(user) {
    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );
}

export function logout() {
    localStorage.removeItem("currentUser");
}