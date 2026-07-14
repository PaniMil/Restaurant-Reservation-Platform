import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants } from "../services/restaurants";
import { getFavorites, addFavorite, removeFavorite } from "../services/favorites";
import { getCurrentUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import categories from "../data/categories";
import HeroSection from "../components/HeroSection";

function Home() {

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const user = getCurrentUser();

    const [favorites, setFavorites] = useState([]);

    const [category, setCategory] = useState("All");

    const [restaurants, setRestaurants] = useState([]);

    const filteredRestaurants = restaurants.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    ).filter((r) => category === "All" ? true : r.category === category);

    const toggleFavorite = async (restaurantId) => {

        if (!user) {
            navigate("/login")
            return;
        }
        try {

            const exists = favorites.some(
                restaurant => restaurant.id === restaurantId
            );

            if (exists) {

                await removeFavorite(
                    user.id,
                    restaurantId
                );
                const data = await getFavorites(user.id);

                setFavorites(data);

            }

            else {

                await addFavorite(
                    user.id,
                    restaurantId
                );

                const data =
                    await getFavorites(user.id);

                setFavorites(data);

            }

        }

        catch (err) {

            console.log(err);

        }

    };

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

    useEffect(() => {

        async function loadRestaurants() {

            try {

                const data = await getRestaurants();

                setRestaurants(data);

            }

            catch (err) {

                console.log(err);

            }

        }

        loadRestaurants();

    }, []);

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center pt-20 px-10">

            <HeroSection
                search={search}
                setSearch={setSearch}
            />

            <CategoryFilter

                categories={categories}

                category={category}

                setCategory={setCategory}

            />

            <div className="mt-16 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            id={restaurant.id}
                            name={restaurant.name}
                            category={restaurant.category}
                            city={restaurant.city}
                            tables={restaurant.tables}
                            image_url={restaurant.image_url}
                            favorite={favorites.some((favorite) => favorite.id === restaurant.id)}
                            onFavorite={() => toggleFavorite(restaurant.id)}
                        />
                    ))) : (
                    <div className="bg-white rounded-xl shadow-md p-10 text-center mb-10">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No restaurant found
                        </h2>
                        <p className="text-gray-500 mt-5">
                            Try another search or choose a different category
                        </p>
                    </div>
                )
                }

            </div>

        </div>
    );
}

export default Home;