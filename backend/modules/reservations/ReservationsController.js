import {
    getAllReservations,
    getReservationById,
    createReservation as createReservationService,
    updateReservation,
    deleteReservation,
    getReservationsByRestaurant
} from "./ReservationsService.js";

export async function getReservations(req, res) {

    try {

        const reservations = await getAllReservations();

        res.json(reservations);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get reservations"
        });

    }

}

export async function getReservation(req, res) {

    try {

        const { id } = req.params;

        const reservation = await getReservationById(id);

        if (!reservation) {

            return res.status(404).json({
                message: "Reservation not found"
            });

        }

        res.json(reservation);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get reservation"
        });

    }

}

export async function createReservation(req, res) {

    try {
        const reservation = await createReservationService(req.body);
        res.status(201).json(reservation);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create reservation"
        });

    }

}

export async function editReservation(req, res) {

    try {

        const { id } = req.params;

        const reservation = await updateReservation(id, req.body);

        if (!reservation) {

            return res.status(404).json({
                message: "Reservation not found"
            });

        }

        res.json(reservation);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update reservation"
        });

    }

}

export async function removeReservation(req, res) {

    try {

        const { id } = req.params;

        const reservation = await deleteReservation(id);

        if (!reservation) {

            return res.status(404).json({
                message: "Reservation not found"
            });

        }

        res.json({
            message: "Reservation deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete reservation"
        });

    }

}

export async function getRestaurantReservations(req, res) {

    try {

        const { restaurantId, date } = req.query;

        const reservations =
            await getReservationsByRestaurant(
                restaurantId,
                date
            );

        res.json(reservations);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed to get reservations."
        });

    }

}