import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import users from "../data/users";
import { getUsers } from "../services/users";
import { login } from "../services/auth";

function Login({ setUser }) {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {

        const users = getUsers();

        const user = users.find(
            (user) =>
                user.username === username &&
                user.password === password
        );

        if (!user) {

            alert("Username or password is incorrect.");

            return;
        }

        login(user);

        setUser(user);

        if (user.role === "admin") {

            navigate("/admin");

        } else {

            navigate("/");

        }
    };

    return (

        <div className="min-h-screen bg-orange-50 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-orange-600 text-center">
                    Login
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 mt-8"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 mt-5"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-8 transition"
                >
                    Login
                </button>
                <p className="text-center text-blue-500 mt-6">

                    Don't have an account?

                    <span

                        onClick={() => navigate("/register")}

                        className="text-orange-500 cursor-pointer ml-2 hover:underline"

                    >

                        Register

                    </span>

                </p>

            </div>

        </div>

    );
}

export default Login;