import express from "express";
import { getRestaurants, getRestaurant, createRestaurant, editRestaurant, removeRestaurant } from "./RestaurantsController.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.post("/", createRestaurant);
router.put("/:id", editRestaurant);
router.delete("/:id", removeRestaurant);

export default router;