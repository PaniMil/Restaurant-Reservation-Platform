import reservationData from "../data/reservations";


const STORAGE_KEY = "reservations";

export function getReservations() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reservationData)
    );

    return reservationData;

}

export function saveReservations(reservations) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reservations)
    );

}

export function addReservation(reservation) {

    const reservations = getReservations();


    const updatedReservations = [...reservations, reservation];

    saveReservations(updatedReservations);

}

export function cancelReservation(id) {

    const reservations = getReservations();

    const updatedReservations = reservations.map((reservation) => {

        if (reservation.id === id) {

            return {
                ...reservation,
                cancelled: true
            };

        }

        return reservation;

    });


    saveReservations(updatedReservations);

}