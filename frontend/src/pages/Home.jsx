import RestaurantCard from "../components/RestaurantCard";

const restaurants = [
    {
        id: 1,
        name: "AAAA",
        category: "Italian",
        city: "Shiraz",
        tables: 30,
    },
    {
        id: 2,
        name: "BBBB",
        category: "Cafe",
        city: "Tehran",
        tables: 50,
    },
    {
        id: 3,
        name: "CCCC",
        category: "Healthy",
        city: "Rasht",
        tables: 50,
    },
];

function Home() {
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
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 outline-none"
                />

                <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 rounded-r-lg  "
                >
                    Search
                </button>

            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

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

            </div>

            <div className="mt-16 w-full max-w-5xl mx-auto space-y-8">

                {
                    restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            name={restaurant.name}
                            category={restaurant.category}
                            city={restaurant.city}
                            tables={restaurant.tables}
                        />
                    ))
                }

            </div>

        </div>
    );
}

export default Home;