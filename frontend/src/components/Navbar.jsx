import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

function Navbar({ user, setUser }) {

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        setUser(null);

        navigate("/");

    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            
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

                    {user?.role === "admin" ? (

                        <Link
                            to="/admin"
                            className="text-gray-700 hover:text-orange-600 transition"
                        >
                            Dashboard
                        </Link>

                    ) : (

                        <Link
                            to="/favorites"
                            className="text-gray-700 hover:text-orange-600 transition"
                        >
                            Favorites
                        </Link>

                    )}

                    {user ? (

                        <>

                            <Link
                                to="/profile"
                                className="text-gray-700 hover:text-orange-600 transition"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>

                        </>

                    ) : (

                        <Link
                            to="/login"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                        >
                            Login
                        </Link>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;