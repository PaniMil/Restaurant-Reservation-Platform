import express from "express";

import{

    getAllRatingsController,
    getRatings,
    getRating,
    addRating,
    editRating,
    removeRating

}from "./RatingsController.js";

const router=express.Router();

router.get("/", getAllRatingsController);

router.get("/restaurant/:restaurantId",getRatings);

router.get("/:id",getRating);

router.post("/",addRating);

router.put("/:id",editRating);

router.delete("/:id",removeRating);

export default router;