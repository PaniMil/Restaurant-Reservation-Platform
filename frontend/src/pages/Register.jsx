import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, getUsers } from "../services/users";
import { login } from "../services/auth";

function Register({ setUser }) {

    const [fullName, setFullName] = useState("");

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function handleRegister() {

        if (
            !fullName ||
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            alert("Please fill all fields.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        const users = getUsers();

        const usernameExists = users.some(
            (user) => user.username === username
        );

        if (usernameExists) {

            alert("Username already exists.");

            return;

        }

        const emailExists = users.some(
            (user) => user.email === email
        );

        if (emailExists) {

            alert("Email already exists.");

            return;

        }

        const newUser = {

            id: Date.now(),

            fullName,

            username,

            email,

            password,

            createdAt: new Date().toLocaleDateString()

        };

        addUser(newUser);

        login(newUser);

        setUser(newUser);

        navigate("/");

    }

    return (

        <div className="min-h-screen bg-orange-50 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-orange-600 text-center">

                    Register

                </h1>

                <input

                    type="text"

                    placeholder="Full Name"

                    value={fullName}

                    onChange={(e) => setFullName(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-8"

                />

                <input

                    type="text"

                    placeholder="Username"

                    value={username}

                    onChange={(e) => setUsername(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <input

                    type="password"

                    placeholder="Confirm Password"

                    value={confirmPassword}

                    onChange={(e) => setConfirmPassword(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />

                <button

                    onClick={handleRegister}

                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-8 transition"

                >

                    Register

                </button>

            </div>

        </div>

    );

}

export default Register;