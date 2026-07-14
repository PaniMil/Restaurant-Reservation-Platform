import { getAllRestaurants, getRestaurantById, createARestaurant, updateRestaurant, deleteRestaurant } from "./RestaurantsService.js";

export async function getRestaurants(req, res) {

    try {

        const restaurants = await getAllRestaurants();

        res.json(restaurants);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get restaurants"
        });

    }

}

export async function getRestaurant(req, res) {

    try {

        const { id } = req.params;

        const restaurant = await getRestaurantById(id);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.json(restaurant);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get restaurant"
        });

    }

}

export async function createRestaurant(req, res) {

    try {

        const restaurant = await createARestaurant(req.body);

        res.status(201).json(restaurant);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Failed to create restaurant."
        });

    }

}

export async function editRestaurant(req, res) {

    try {

        const { id } = req.params;

        const restaurant = await updateRestaurant(id, req.body);

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }

        res.json(restaurant);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update restaurant"
        });

    }

}

export async function removeRestaurant(req, res) {

    try {

        const { id } = req.params;

        const restaurant = await deleteRestaurant(id);

        if (!restaurant) {

            return res.status(404).json({
                message: "Restaurant not found"
            });

        }

        res.json({
            message: "Restaurant deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete restaurant"
        });

    }

}