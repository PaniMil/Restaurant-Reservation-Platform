import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

                <Link
                    to="/"
                    className="text-2xl font-bold text-orange-600"
                >
                    TableTime
                </Link>

                <div className="flex items-center gap-6">

                    <Link
                        to="/"
                        className="text-gray-700 hover:text-orange-600 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/favorites"
                        className="text-gray-700 hover:text-orange-600 transition"
                    >
                        Favorites
                    </Link>

                    <Link
                        to="/login"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;