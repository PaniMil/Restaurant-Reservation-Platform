import { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
// import restaurants from "../data/restaurants";
import { getRestaurants } from "../services/restaurants";
import { getFavorites, saveFavorites } from "../services/favorites";

function Home() {

    const [search, setSearch] = useState("");

    const categories = [
        "All",
        "Italian",
        "Fast Food",
        "Cafe",
        "Japanese",
        "Steak",
        "Dessert",
        "Healthy",
    ];

    const [favorites, setFavorites] = useState(getFavorites);

    const [category, setCategory] = useState("All");

    const [restaurants, setRestaurants] = useState(getRestaurants());

    const filteredRestaurants = restaurants.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
    ).filter((r) => category === "All" ? true : r.category === category);

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter((item) => item !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    useEffect(() => {
        saveFavorites(favorites);
    }, [favorites]);

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col items-center pt-20 px-10">
            <h1 className="text-5xl font-bold text-orange-600 text-center pt-20">
                TableTime
            </h1>

            <p className="text-2xl font-semibold text-gray-700 mt-6">
                Find Your Perfect Restaurant
            </p>

            <p className="text-gray-500 mt-3">
                Reserve your favorite table in seconds.
            </p>

            <div className="mt-10 flex w-full max-w-2xl">

                <input
                    type="text"
                    placeholder="Search restaurant..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none"
                />


            </div>

            {/* <div className="mt-10 flex flex-wrap justify-center gap-4">

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    🍕 Italian
                </button>

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    🍔 Fast Food
                </button>

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    ☕ Cafe
                </button>

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    🍣 Japanese
                </button>

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    🥩 Steak
                </button>

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    🍰 Dessert
                </button>

                <button className="bg-white border border-orange-300 text-orange-600 px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-500">
                    🥗 Healthy
                </button>

            </div> */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-5 py-2 rounded-full border transition duration-300
                ${category === cat
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-orange-600 border-orange-300 hover:bg-orange-500 hover:text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

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

                            favorite={favorites.includes(restaurant.id)}
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