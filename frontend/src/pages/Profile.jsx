import { getCurrentUser } from "../services/auth";
import { getReservations } from "../services/reservation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { getFavorites } from "../services/favorites";

function Profile() {

    const [user, setUser] = useState(getCurrentUser());

    const [reservationCount, setReservationCount] = useState(0);

    const [favoriteCount, setFavoriteCount] = useState(0);

    const navigate = useNavigate();

    const [showEditProfile, setShowEditProfile] = useState(false);

    const [showChangePassword, setShowChangePassword] = useState(false);

    useEffect(() => {

        if (!user) return;

        loadReservations();

        loadFavorites();

    }, []);

    async function loadReservations() {

        try {

            const reservations = await getReservations();

            setReservationCount(

                reservations.filter(

                    reservation => reservation.user_id === user.id

                ).length

            );

        }

        catch (err) {

            console.log(err);

        }

    }

    async function loadFavorites() {

        try {

            const favorites = await getFavorites(user.id);

            setFavoriteCount(favorites.length);

        }

        catch (err) {

            console.log(err);

        }

    }

    if (!user) {

        return null;

    }

    return (

        <div className="min-h-screen bg-orange-50 py-10 px-6">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">

                <h1 className="text-4xl font-bold text-orange-600">
                    My Profile
                </h1>

                <div className="mt-8 space-y-5">

                    <div>
                        <p className="text-gray-500">
                            Username
                        </p>

                        <h2 className="text-xl font-semibold">
                            {user.username}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Full Name
                        </p>

                        <h2 className="text-xl font-semibold">
                            {user.full_name}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Email
                        </p>

                        <h2 className="text-xl font-semibold">
                            {user.email}
                        </h2>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Member Since
                        </p>

                        <h2 className="text-xl font-semibold">
                            {new Date(user.created_at).toLocaleDateString()}
                        </h2>
                    </div>

                    <div className="mt-10 flex gap-4">

                        <button

                            onClick={() => setShowEditProfile(true)}

                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition"

                        >

                            Edit Profile

                        </button>

                        <button

                            onClick={() => setShowChangePassword(true)}

                            className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg transition"

                        >
                            Change Password
                        </button>

                    </div>
                    {user.role !== "admin" && (
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div
                                onClick={() => navigate("/favorites")}
                                className="bg-orange-100 rounded-xl p-6 cursor-pointer hover:bg-orange-200 transition"
                            >

                                <h3 className="text-lg font-semibold text-orange-700">
                                    Favorite Restaurants
                                </h3>

                                <p className="text-3xl font-bold mt-3">
                                    {favoriteCount}
                                </p>

                            </div>

                            <div
                                onClick={() => navigate("/reservations")}
                                className="bg-blue-100 rounded-xl p-6 cursor-pointer hover:bg-blue-200 transition"
                            >

                                <h3 className="text-lg font-semibold text-blue-700">
                                    Reservations
                                </h3>

                                <p className="text-3xl font-bold mt-3">
                                    {reservationCount}
                                </p>

                            </div>

                        </div>
                    )}

                </div>

            </div>

            {
                showEditProfile && (

                    <EditProfileModal

                        user={user}

                        onClose={
                            () => {
                                setShowEditProfile(false);
                                setUser(getCurrentUser());
                            }}

                    />

                )
            }

            {
                showChangePassword && (

                    <ChangePasswordModal

                        user={user}

                        onClose={() => {

                            setShowChangePassword(false);

                            setUser(getCurrentUser());

                        }}

                    />

                )
            }
        </div>

    );

}

export default Profile;