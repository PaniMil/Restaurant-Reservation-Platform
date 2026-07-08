import { Link } from "react-router-dom";
function RestaurantCard({ id, name, category, city, tables, favorite, onFavorite }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="relative">

                <img
                    src=""
                    alt="Restaurant"
                    className="w-full h-40 object-cover"
                />

                <button
                    onClick={onFavorite}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition duration-300"
                >
                    {favorite ? "❤️" :"🤍"}
                </button>

            </div>

            <div className="p-4">

                <h2 className="text-xl font-bold text-gray-800">
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

                <Link
                    to={`/restaurant/${id}`}
                    className="block mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white text-center px-4 py-2 rounded-lg transition duration-300"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}

export default RestaurantCard;