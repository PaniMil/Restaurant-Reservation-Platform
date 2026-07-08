import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RestaurantDetails from "./pages/RestaurantDetails";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";

function App() {
    return (

        <>
            <Navbar />
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
                    element={<Favorites />}
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