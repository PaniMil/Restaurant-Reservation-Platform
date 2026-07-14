import {

    getAllRatings,
    getRestaurantRatings,
    getRatingById,
    createRating,
    updateRating,
    deleteRating

} from "./RatingsService.js";

export async function getAllRatingsController(req, res) {

    try {

        const ratings = await getAllRatings();

        res.json(ratings);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to get ratings."

        });

    }

}

export async function getRatings(req, res) {

    try {

        const { restaurantId } = req.params;

        const ratings =
            await getRestaurantRatings(
                restaurantId
            );

        res.json(ratings);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to get ratings."

        });

    }

}

export async function getRating(req, res) {

    try {

        const { id } = req.params;

        const rating =
            await getRatingById(id);

        if (!rating) {

            return res.status(404).json({

                message: "Rating not found."

            });

        }

        res.json(rating);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to get rating."

        });

    }

}

export async function addRating(req, res) {

    try {

        const rating =
            await createRating(req.body);

        res.status(201).json(rating);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to create rating."

        });

    }

}

export async function editRating(req, res) {

    try {

        const { id } = req.params;

        const rating =
            await updateRating(
                id,
                req.body
            );

        if (!rating) {

            return res.status(404).json({

                message: "Rating not found."

            });

        }

        res.json(rating);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to update rating."

        });

    }

}

export async function removeRating(req, res) {

    try {

        const { id } = req.params;

        const rating =
            await deleteRating(id);

        if (!rating) {

            return res.status(404).json({

                message: "Rating not found."

            });

        }

        res.json({

            message: "Rating deleted successfully."

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to delete rating."

        });

    }

}