import { getCurrentUser } from "../services/auth";

function Profile() {

    const user = getCurrentUser();

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
                            {user.fullName}
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
                            {user.createdAt}
                        </h2>
                    </div>

                    <div className="mt-10 flex gap-4">

                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition"
                        >
                            Edit Profile
                        </button>

                        <button
                            className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg transition"
                        >
                            Change Password
                        </button>

                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-orange-100 rounded-xl p-6">

                            <h3 className="text-lg font-semibold text-orange-700">
                                Favorite Restaurants
                            </h3>

                            <p className="text-3xl font-bold mt-3">
                                0
                            </p>

                        </div>

                        <div className="bg-blue-100 rounded-xl p-6">

                            <h3 className="text-lg font-semibold text-blue-700">
                                Reservations
                            </h3>

                            <p className="text-3xl font-bold mt-3">
                                0
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;