import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { getCurrentUser } from "./services/auth";
import Profile from "./pages/Profile";
import Reservation from "./pages/Reservation";
import MyReservations from "./pages/MyReservations";
import Register from "./pages/Register";

function App() {

    const [user, setUser] = useState(getCurrentUser);

    return (

        <>
            <Navbar
                user={user}
                setUser={setUser}
            />
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/restaurant/:id"
                    element={<RestaurantDetails />}
                />
                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>

                            <Favorites />

                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={<Login setUser={setUser} />}
                />

                <Route
                    path="/register"
                    element={<Register setUser={setUser} />}
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>

                            <Profile />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/restaurant/:id/reserve"
                    element={
                        <ProtectedRoute>

                            <Reservation />

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reservations"
                    element={<MyReservations />}
                />

            </Routes>
        </>

    );
}

export default App;

















// import Home from "./pages/Home";

// function App() {
//   return <Home />;
// }

// export default App;