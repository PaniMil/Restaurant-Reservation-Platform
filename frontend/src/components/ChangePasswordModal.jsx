import { useState } from "react";
import { changePassword } from "../services/users";

function ChangePasswordModal({ user, onClose }) {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSave() {

        if (newPassword !== confirmPassword) {

            alert("New passwords do not match.");

            return;

        }

        if (newPassword.length < 4) {

            alert("Password must be at least 4 characters.");

            return;

        }

        try {

            await changePassword(

                user.id,

                currentPassword,

                newPassword

            );

            alert("Password changed successfully.");

            onClose();

        }

        catch (err) {

            console.log(err);

            alert(err.message);

        }

    }

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-orange-600">

                    Change Password

                </h2>

                <input

                    type="password"

                    placeholder="Current Password"

                    value={currentPassword}

                    onChange={(e) => setCurrentPassword(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-6"

                />

                <input

                    type="password"

                    placeholder="New Password"

                    value={newPassword}

                    onChange={(e) => setNewPassword(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <input

                    type="password"

                    placeholder="Confirm New Password"

                    value={confirmPassword}

                    onChange={(e) => setConfirmPassword(e.target.value)}

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

export default ChangePasswordModal;