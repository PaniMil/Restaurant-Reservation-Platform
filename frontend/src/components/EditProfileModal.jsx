import { useState } from "react";
import { updateCurrentUser } from "../services/auth";
import { getUsers, saveUsers } from "../services/users";

function EditProfileModal({ user, onClose }) {

    const [fullName, setFullName] = useState(user.fullName);

    const [username, setUsername] = useState(user.username);

    const [email, setEmail] = useState(user.email);

    function handleSave() {

        const updatedUser = {

            ...user,

            fullName,

            username,

            email

        };


        const users = getUsers();


        const updatedUsers = users.map((item) => {

            if (item.id === user.id) {

                return updatedUser;

            }

            return item;

        });


        saveUsers(updatedUsers);


        updateCurrentUser(updatedUser);


        alert("Profile updated!");


        onClose();

    }

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-orange-600">

                    Edit Profile

                </h2>

                <input

                    type="text"

                    value={fullName}

                    onChange={(e) => setFullName(e.target.value)}

                    placeholder="Full Name"

                    className="w-full border rounded-lg px-4 py-3 mt-6"

                />

                <input

                    type="text"

                    value={username}

                    onChange={(e) => setUsername(e.target.value)}

                    placeholder="Username"

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <input

                    type="email"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    placeholder="Email"

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <div className="flex gap-4 mt-8">

                    <button

                        onClick={handleSave}

                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"

                    >

                        Save

                    </button>

                    <button

                        onClick={onClose}

                        className="flex-1 border border-gray-300 py-3 rounded-lg"

                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;