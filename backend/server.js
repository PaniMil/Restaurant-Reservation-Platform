import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoutes from "./modules/restaurants/RestaurantsRoutes.js";
import usersRoutes from "./modules/users/UsersRoutes.js";
// import sql from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/users", usersRoutes);

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
