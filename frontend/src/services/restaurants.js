import restaurantsData from "../data/restaurants";


const STORAGE_KEY = "restaurants";


export function getRestaurants() {

    const data = localStorage.getItem(STORAGE_KEY);


    if (data) {

        return JSON.parse(data);

    }


    saveRestaurants(restaurantsData);


    return restaurantsData;

}



export function saveRestaurants(restaurants) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(restaurants)
    );

}



export function addRestaurant(restaurant) {

    const restaurants = getRestaurants();


    const updatedRestaurants = [
        ...restaurants,
        restaurant
    ];


    saveRestaurants(updatedRestaurants);

}

export function deleteRestaurant(id) {

    const restaurants = getRestaurants();


    const updatedRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== id
    );


    saveRestaurants(updatedRestaurants);

}



export function updateRestaurant(updatedRestaurant) {

    const restaurants = getRestaurants();


    const updatedRestaurants = restaurants.map(
        (restaurant) => {

            if (restaurant.id === updatedRestaurant.id) {

                return updatedRestaurant;

            }

            return restaurant;

        }
    );


    saveRestaurants(updatedRestaurants);

}

export function getRestaurantById(id) {

    const restaurants = getRestaurants();


    return restaurants.find(
        (restaurant) => restaurant.id === Number(id)
    );

}