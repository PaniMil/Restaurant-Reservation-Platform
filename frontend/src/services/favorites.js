export function getFavorites() {
    const data = localStorage.getItem("favorites");

    return data ? JSON.parse(data) : [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}