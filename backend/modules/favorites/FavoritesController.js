import {

    getUserFavorites,
    createFavorite,
    deleteFavorite,
    checkFavorite

} from "./FavoritesService.js";

export async function getFavorites(req, res) {

    try {

        const { userId } = req.params;

        const favorites = await getUserFavorites(userId);

        res.json(favorites);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to get favorites."

        });

    }

}

export async function addFavorite(req, res) {

    try {

        const favorite = await createFavorite(req.body);

        res.status(201).json(favorite);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to add favorite."

        });

    }

}

export async function removeFavorite(req, res) {

    try {

        const {

            user_id,
            restaurant_id

        } = req.body;

        const favorite = await deleteFavorite(

            user_id,
            restaurant_id

        );

        if (!favorite) {

            return res.status(404).json({

                message: "Favorite not found."

            });

        }

        res.json({

            message: "Favorite deleted successfully."

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to delete favorite."

        });

    }

}

export async function isFavorite(req, res) {

    try {

        const {

            userId,
            restaurantId

        } = req.query;

        const favorite = await checkFavorite(

            userId,
            restaurantId

        );

        res.json({

            favorite

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Failed to check favorite."

        });

    }

}