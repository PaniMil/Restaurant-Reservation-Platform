import express from "express";

import {

    getFavorites,
    addFavorite,
    removeFavorite,
    isFavorite

} from "./FavoritesController.js";

const router = express.Router();

router.get("/check", isFavorite);

router.get("/:userId", getFavorites);

router.post("/", addFavorite);

router.delete("/", removeFavorite);


export default router;