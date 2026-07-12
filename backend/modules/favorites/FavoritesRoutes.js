import express from "express";

import {

    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite

} from "./FavoritesController.js";

const router = express.Router();

router.get("/user/:userId", getFavorites);

router.get("/check", isFavorite);

router.post("/", addFavorite);

router.delete("/", removeFavorite);

export default router;