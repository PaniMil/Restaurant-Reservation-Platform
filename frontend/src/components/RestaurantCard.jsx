function RestaurantCard({ name, category, city, tables, }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <img
                src=""
                alt="Restaurant"
                className="w-full h-60 object-cover"
            />

            <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-800">
                    {name}
                </h2>

                <p className="text-orange-600 mt-2">
                    {category}
                </p>

                <p className="text-gray-500 mt-2">
                    {city}
                </p>

                <p className="text-gray-500 mt-2">
                    {tables}
                </p>

                <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition duration-300">
                    View Details
                </button>

            </div>

        </div>
    );
}

export default RestaurantCard;