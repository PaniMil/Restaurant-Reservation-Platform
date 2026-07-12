import express from "express";

import {
    getReservations,
    getReservation,
    createReservation,
    editReservation,
    removeReservation,
    getRestaurantReservations
} from "./ReservationsController.js";

const router = express.Router();

router.get("/", getReservations);

router.get("/restaurant", getRestaurantReservations);

router.get("/:id", getReservation);

router.post("/", createReservation);

router.put("/:id", editReservation);

router.delete("/:id", removeReservation);

export default router;