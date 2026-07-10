const reservations = [

    {
        id: 1,
        restaurantId: 1,

        userId: 1,

        username: "PaniMil",


        date: "2026-07-09",

        startTime: "13:00",

        endTime: "15:00",

        guests: 4,
        request: "",
        cancelled: false,
        rating: 5,
            comment: "Excellent food!"

    },

    {
        id: 2,
        restaurantId: 1,

        userId: 2,

        username: "BarMil",

        date: "2026-07-09",

        startTime: "18:00",

        endTime: "20:00",

        guests: 4,
        request: "",
        cancelled: false,
        rating: 4,
            comment: "good!"
    },

    {
        id: 3,
        restaurantId: 2,

        date: "2026-07-10",

        startTime: "12:00",

        endTime: "13:30",

        guests: 4,
        request: "",
        cancelled: false,
        rating: 3,
            comment: "not bad!"
    }

];

export default reservations;