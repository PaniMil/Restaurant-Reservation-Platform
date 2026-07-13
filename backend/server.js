import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoutes from "./modules/restaurants/RestaurantsRoutes.js";
import usersRoutes from "./modules/users/UsersRoutes.js";
import reservationsRoutes from "./modules/reservations/ReservationsRoutes.js";
import favoritesRoutes from "./modules/favorites/FavoritesRoutes.js";
import ratingsRoutes from "./modules/ratings/RatingsRoutes.js";

// import sql from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/users", usersRoutes);

app.use("/api/reservations", reservationsRoutes);

app.use("/api/favorites", favoritesRoutes);

app.use("/api/ratings",ratingsRoutes);

app.get("/", (req, res) => {
    res.send("TableTime API is running...");
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import restaurantRoutes from "./modules/restaurants/RestaurantsRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use("/api/restaurants", restaurantRoutes);
