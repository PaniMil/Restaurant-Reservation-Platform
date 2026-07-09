import { useEffect, useState } from "react";
// import restaurants from "../data/restaurants";
import { getRestaurants } from "../services/restaurants";
import RestaurantCard from "../components/RestaurantCard";
import { getFavorites, saveFavorites } from "../services/favorites";


function Favorites() {

    const restaurants = getRestaurants();

    const [favorites, setFavorites] = useState(getFavorites);

    const favoriteRestaurants = restaurants.filter((restaurant) =>
        favorites.includes(restaurant.id)
    );

    const toggleFavorite = (id) => {

        if (favorites.includes(id)) {

            setFavorites(
                favorites.filter((item) => item !== id)
            );

        } else {

            setFavorites([...favorites, id]);

        }

    };

    useEffect(() => {

        saveFavorites(favorites);

    }, [favorites]);

    return (

        <div>

            {favoriteRestaurants.length > 0 ? (

                <div className="min-h-screen bg-orange-50 px-8 py-10">

                    <h1 className="text-4xl font-bold text-orange-600 mb-10">
                        My Favorite Restaurants
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {favoriteRestaurants.map((restaurant) => (

                            <RestaurantCard
                                key={restaurant.id}
                                id={restaurant.id}
                                name={restaurant.name}
                                category={restaurant.category}
                                city={restaurant.city}
                                tables={restaurant.tables}

                                favorite={true}

                                onFavorite={() => toggleFavorite(restaurant.id)}
                            />

                        ))}

                    </div>

                </div>

            ) : (

                <div className="min-h-screen bg-orange-50 flex items-center justify-center">

                    <div className="bg-white rounded-xl shadow-md p-10 text-center">

                        <h1 className="text-3xl font-bold text-orange-600">
                            No Favorite Restaurants
                        </h1>

                        <p className="text-gray-500 mt-4">
                            Start adding restaurants to your favorites.
                        </p>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Favorites;