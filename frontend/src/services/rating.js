const STORAGE_KEY = "ratings";


export function getRatings(){

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];

}



export function addRating(rating){

    const ratings = getRatings();

    const updatedRatings = [
        ...ratings,
        rating
    ];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRatings)
    );

}

export function deleteRating(id) {

    const ratings = getRatings();

    const updatedRatings = ratings.filter((rating) => {

        return rating.id !== id;

    });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRatings)
    );

}