import { useEffect, useState } from "react";

import RestaurantCard from "../components/RestaurantCard";

import {
    getFavorites,
    removeFavorite
} from "../services/favorites";

import { getCurrentUser } from "../services/auth";

function Favorites() {

    const user = getCurrentUser();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {

        async function loadFavorites() {

            if (!user) return;

            try {

                const data = await getFavorites(user.id);

                setFavorites(data);

            }

            catch (err) {

                console.log(err);

            }

        }

        loadFavorites();

    }, [user]);

    async function toggleFavorite(restaurant) {

        if (!user) return;

        try {

            await removeFavorite(user.id, restaurant.id);

            const data = await getFavorites(user.id);

            setFavorites(data);

            // await removeFavorite(
            //     user.id,
            //     restaurant.id
            // );

            // setFavorites(

            //     favorites.filter(

            //         (item) => item.id !== restaurant.id

            //     )

            // );

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="min-h-screen bg-orange-50 px-10 py-20">

            <h1 className="text-4xl font-bold text-orange-600">

                My Favorites

            </h1>

            {

                favorites.length === 0 ?

                    (

                        <div className="mt-10">

                            <p className="text-gray-500">

                                You have no favorite restaurants.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {

                                favorites.map((restaurant) => (

                                    <RestaurantCard

                                        key={restaurant.id}

                                        id={restaurant.id}

                                        name={restaurant.name}

                                        city={restaurant.city}

                                        category={restaurant.category}

                                        tables={restaurant.tables}

                                        image_url={restaurant.image_url}


                                        favorite={true}

                                        onFavorite={() =>

                                            toggleFavorite(restaurant)

                                        }

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default Favorites;
